import type { FC } from 'react';
import { useMemo, useState } from 'react';

import { useAppDispatch, useAppSelector } from 'shared/lib/redux';
import { sendEventDriversCarFieldsValueChange } from 'shared/lib/sendGAEvents';
import { SendEventWrapper } from 'shared/lib/sendGAEvents/SendEventWrapper';
import { useCopySelectorToState } from 'shared/lib/useCopySelectorToState';

import { selectCarInfoData, selectVehicleCategory } from 'entities/carInfo';
import {
  type DriversCommonFields,
  FormFieldsValidationSchemaLimitedUpdateDrivers,
  FormFieldsValidationSchemaMultiDrive,
  selectDriverData,
  selectMultiDrive,
  updateDriver,
} from 'entities/drivers';
import { updatePeopleData } from 'entities/people';

import { DriversInfoMultiDriveViewHoc } from '../FormBodyMultidrive';
import { FormFieldsControls, FormFieldsMultiDriveControls } from '../UpdateDrivers.config';
import { FormFieldsLabels, FormFieldsLabelsMultiDrive } from '../UpdateDrivers.texts';

import { DriversInfoViewHoc } from './FormBody';

interface IDriverInfoForm extends IFormPopup {
  isFirstDriver?: boolean;
  driverId: Nullable<string>;
  driverIndex: number;
  onAddDriver?: () => void;
  onDeleteDriver?: (driverId: string) => void;
  isPossibleToAddDriver?: boolean;
  isPossibleToDeleteDriver?: boolean;
}

export const Form: FC<IDriverInfoForm> = (props) => {
  const {
    isDialog = false,
    onClose,
    driverId,
    isLoading,
    onDeleteDriver,
    onAddDriver,
    isPossibleToAddDriver,
    isPossibleToDeleteDriver,
    isFirstDriver,
    driverIndex,
    isFormForceOpened,
    setHeader,
    onFormSubmit,
    shouldShowDriverKbm,
  } = props;
  const formData = useCopySelectorToState(selectDriverData(driverId));
  const dispatch = useAppDispatch();
  const [isCurrentMultiDrive, setCurrentMultiDrive] = useState(useAppSelector(selectMultiDrive));
  const { category } = useAppSelector(selectCarInfoData);
  const vehicleCategory = useAppSelector(selectVehicleCategory);

  const handleCarInfoData = (actualData: DriversCommonFields, type: string) => {
    if (type === 'fullFilled') {
      dispatch(
        updatePeopleData({
          ...actualData,
          fullName: typeof actualData.fullName?.value === 'string' ? actualData.fullName?.value : '',
          hasPreviousLicence: !!actualData.hasPreviousLicence,
        }),
      );

      // данные текущего шага, сетим в стор в последний момент иначе срабатывает рекалькуляция шагов в хуке useStepper,
      // а данные следующего шага еще в стор не записывались и полученное значение текущего шага может быть некорректным из-за неполных данных в сторе
      dispatch(updateDriver({ driverId, data: actualData, isMultiDrive: isCurrentMultiDrive }));
      onFormSubmit?.(actualData, isDialog);
    }

    if (isDialog) {
      onClose?.();
    }
  };

  const handleDeleteDriver = () => {
    if (driverId) {
      onDeleteDriver?.(driverId);
    }
  };

  const formLabels = useMemo(() => FormFieldsLabels(vehicleCategory), [vehicleCategory]);

  return (
    <SendEventWrapper
      sendEvent={({ fieldName, previousValue, newValue }) => {
        sendEventDriversCarFieldsValueChange({
          // евент не знает о типе fieldName поэтому нужен as
          fieldName: FormFieldsLabels(vehicleCategory)[fieldName as keyof DriversCommonFields],
          previousValue,
          newValue,
          driverIndex,
          eventAction: 'Изменение данных о водителе',
        });
      }}
    >
      {isCurrentMultiDrive && isFirstDriver && (
        <DriversInfoMultiDriveViewHoc
          additionalProps={{
            onChangeMultiDrive: setCurrentMultiDrive,
            isFormForceOpened,
          }}
          isDialog={isDialog}
          onDataChanged={(_: {}, type: string) => handleCarInfoData(formData, type)}
          defaultData={formData}
          formFieldsControls={FormFieldsMultiDriveControls}
          formLabels={FormFieldsLabelsMultiDrive}
          validationSchema={FormFieldsValidationSchemaMultiDrive}
        />
      )}

      <DriversInfoViewHoc
        additionalProps={{
          isFormForceOpened,
          driverId,
          onDeleteDriver: handleDeleteDriver,
          onAddDriver,
          isPossibleToAddDriver,
          isPossibleToDeleteDriver,
          isFirstDriver,
          onChangeMultiDrive: setCurrentMultiDrive,
          isMultidrive: isCurrentMultiDrive,
          setHeader,
          driverIndex,
          shouldShowDriverKbm,
        }}
        isLoading={isLoading}
        isDialog={isDialog}
        onDataChanged={handleCarInfoData}
        defaultData={formData}
        validationSchema={FormFieldsValidationSchemaLimitedUpdateDrivers(
          category?.value === undefined ? category?.value : category?.value?.toString(),
        )}
        formFieldsControls={FormFieldsControls}
        formLabels={formLabels}
      />
    </SendEventWrapper>
  );
};
