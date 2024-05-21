import type { FC } from 'react';
import { useMemo } from 'react';

import { useAppDispatch, useAppSelector } from 'shared/lib/redux';
import { sendEventCarFieldsValueChange, sendEventSubmitCarInfo } from 'shared/lib/sendGAEvents';
import { SendEventWrapper } from 'shared/lib/sendGAEvents/SendEventWrapper';
import { useCopySelectorToState } from 'shared/lib/useCopySelectorToState';

import {
  type CarInfoCommonFields,
  FormFieldsValidationSchemaCarInfo,
  selectCarInfoData,
  selectVehicleType,
} from 'entities/carInfo';
import { setCarInfo } from 'entities/carInfo/model/carInfo.slice';
import { selectOwnerData } from 'entities/owner';
import { useLazyGetPolicyInfoFromCarInfoAndOwner } from 'entities/PolicyInfo/lib/useLazyGetPolicyInfoFromQuery/useLazyGetPolicyInfoFromCarInfoAndOwner';

import { FormFieldsControls } from '../CarInfo.config';
import type { TFormFields } from '../CarInfo.texts';
import { FormFields } from '../CarInfo.texts';
import { CarInfoViewHoc } from '../FormBody/FormBody';

export const Form: FC<
  IFormPopup & {
    shouldRestoreAdditionalData?: boolean;
  }
> = ({
  isLoading,
  isDialog = false,
  onClose,
  setHeader,
  isFormForceOpened,
  onFormSubmit,
  shouldRestoreAdditionalData,
}) => {
  const formData = useCopySelectorToState(selectCarInfoData);
  const dispatch = useAppDispatch();

  const { getPolicyInfo, isLoading: isLoadingPolicyInfo } = useLazyGetPolicyInfoFromCarInfoAndOwner();
  const owner = useAppSelector(selectOwnerData);
  const vehicleType = useAppSelector(selectVehicleType);

  const handleCarInfoData = async (actualData: CarInfoCommonFields, type: string) => {
    if (type === 'fullFilled') {
      // данные текущего шага, сетим в стор в последний момент иначе срабатывает рекалькуляция шагов в хуке useStepper,
      // а данные следующего шага еще в стор не записывались и полученное значение текущего шага может быть некорректным из-за неполных данных в сторе
      dispatch(setCarInfo({ data: actualData, isFullFilled: true }));
      // Если у нас уже есть собственник и мы обновили авто, то запрашиваем еще раз рекомендованную дату и информацию по полисам
      owner && (await getPolicyInfo(actualData, owner));

      !isDialog && sendEventSubmitCarInfo({ brand: actualData.carBrand?.label, model: actualData.carModel?.label });

      onFormSubmit?.(actualData, isDialog);
    }
    if (isDialog) {
      onClose?.();
    }
  };

  const formLabels = useMemo(() => FormFields(vehicleType), [vehicleType]);
  const formFieldsControlsProps = useMemo(() => FormFieldsControls(vehicleType), [vehicleType]);

  return (
    <SendEventWrapper
      sendEvent={({ fieldName, previousValue, newValue }) => {
        sendEventCarFieldsValueChange({
          eventAction: 'Изменение данных о ТС',
          // евент не знает о типе fieldName поэтому нужен as
          fieldName: FormFields(vehicleType)[fieldName as TFormFields],
          previousValue,
          newValue,
        });
      }}
    >
      <CarInfoViewHoc
        isDialog={isDialog}
        onDataChanged={handleCarInfoData}
        defaultData={formData}
        validationSchema={FormFieldsValidationSchemaCarInfo()}
        isLoading={isLoading || isLoadingPolicyInfo}
        additionalProps={{
          setHeader,
          isFormForceOpened,
          shouldRestoreAdditionalData: !!shouldRestoreAdditionalData,
        }}
        formLabels={formLabels}
        formFieldsControls={formFieldsControlsProps}
      />
    </SendEventWrapper>
  );
};
