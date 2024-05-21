import type { FC } from 'react';

import { useAppDispatch, useAppSelector } from 'shared/lib/redux';
import { sendEventCarFieldsValueChange } from 'shared/lib/sendGAEvents';
import { SendEventWrapper } from 'shared/lib/sendGAEvents/SendEventWrapper';
import { useCopySelectorToState } from 'shared/lib/useCopySelectorToState';

import { selectCarInfoData } from 'entities/carInfo';
import type { OwnerCommonFields } from 'entities/owner';
import {
  FormFieldsValidationSchemaCarOwner,
  selectIsOwnerFilledByEsia,
  selectOwnerDataOrDefaults,
  setOwnerData,
} from 'entities/owner';
import { updatePeopleData } from 'entities/people';
import { useLazyGetPolicyInfoFromQuery } from 'entities/PolicyInfo';

import { submitOwnerForm } from '../../lib/submitOwnerForm';
import { CarOwnerFormViewHoc } from '../FormBody/FormBody';
import { FormFieldsControls } from '../UpdateCarOwner.config';
import { FormFields } from '../UpdateCarOwner.texts';

export const Form: FC<IFormPopup> = ({
  isDialog = false,
  onClose,
  setHeader,
  isFormForceOpened,
  onFormSubmit,
  isLoading,
}) => {
  const formData = useCopySelectorToState(selectOwnerDataOrDefaults);
  const carInfo = useCopySelectorToState(selectCarInfoData);
  const isFilledByEsia = useAppSelector(selectIsOwnerFilledByEsia);
  const { getPolicyInfo, isPolicyInfoLoading } = useLazyGetPolicyInfoFromQuery();
  const dispatch = useAppDispatch();

  const handleCarInfoData = async (actualData: OwnerCommonFields, type: string) => {
    if (type === 'fullFilled') {
      await dispatch(submitOwnerForm(actualData, getPolicyInfo, isDialog));

      dispatch(
        updatePeopleData({
          ...actualData,
          fullName: typeof actualData.fullName?.value === 'string' ? actualData.fullName?.value : '',
        }),
      );

      // данные текущего шага, сетим в стор в последний момент иначе срабатывает рекалькуляция шагов в хуке useStepper,
      // а данные следующего шага еще в стор не записывались и полученное значение текущего шага может быть некорректным из-за неполных данных в сторе
      await dispatch(setOwnerData({ data: actualData, isFullFilled: true }));

      onFormSubmit?.(actualData, isDialog);
    }

    if (isDialog) {
      onClose?.();
    }
  };

  return (
    <SendEventWrapper
      sendEvent={({ fieldName, previousValue, newValue }) => {
        sendEventCarFieldsValueChange({
          eventAction: 'Изменение данных о собственнике',
          // евент не знает о типе fieldName поэтому нужен as
          fieldName: FormFields[fieldName as keyof OwnerCommonFields],
          previousValue,
          newValue,
        });
      }}
    >
      <CarOwnerFormViewHoc
        isDialog={isDialog}
        isLoading={isLoading || isPolicyInfoLoading}
        onDataChanged={handleCarInfoData}
        defaultData={formData}
        additionalProps={{
          setHeader,
          isFormForceOpened,
          isFilledByEsia,
        }}
        validationSchema={FormFieldsValidationSchemaCarOwner({
          carDocumentIssueDate: carInfo.documentIssueDate,
          carDocumentType: carInfo.documentType,
        })}
        formFieldsControls={FormFieldsControls}
        formLabels={FormFields}
      />
    </SendEventWrapper>
  );
};
