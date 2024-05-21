import type { FC } from 'react';

import { useAppDispatch, useAppSelector } from 'shared/lib/redux';
import { sendEventCarFieldsValueChange, sendEventSubmitInsurerForm } from 'shared/lib/sendGAEvents';
import { SendEventWrapper } from 'shared/lib/sendGAEvents/SendEventWrapper';
import { useCopySelectorToState } from 'shared/lib/useCopySelectorToState';
import type { UserCommonFields } from 'shared/types';

import {
  FormFieldsValidationSchemaInsurer,
  selectInsurerDataOrDefaults,
  selectIsInsurerFilledByEsia,
} from 'entities/insurer';

import { submitInsurerForm } from '../../lib/submitInsurerForm';
import { InsurerFormViewHoc } from '../FormBody/FormBody';
import { FormFieldsControls } from '../UpdateInsurer.config';
import { FormFields } from '../UpdateInsurer.texts';

export const Form: FC<IFormPopup> = ({
  isDialog = false,
  isLoading,
  onClose,
  setHeader,
  isFormForceOpened,
  onFormSubmit,
}) => {
  const formData = useCopySelectorToState(selectInsurerDataOrDefaults);
  const isFilledByEsia = useAppSelector(selectIsInsurerFilledByEsia);
  const dispatch = useAppDispatch();

  const handleCarInfoData = (actualData: UserCommonFields, type: string) => {
    if (type === 'fullFilled') {
      dispatch(submitInsurerForm(actualData));

      !isDialog && sendEventSubmitInsurerForm();

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
          eventAction: 'Изменение данных о страхователе',
          // евент не знает о типе fieldName поэтому нужен as
          fieldName: FormFields[fieldName as keyof UserCommonFields],
          previousValue,
          newValue,
        });
      }}
    >
      <InsurerFormViewHoc
        isDialog={isDialog}
        onDataChanged={handleCarInfoData}
        defaultData={formData}
        isLoading={isLoading}
        additionalProps={{
          setHeader,
          isFormForceOpened,
          isFilledByEsia,
        }}
        formFieldsControls={FormFieldsControls}
        formLabels={FormFields}
        validationSchema={FormFieldsValidationSchemaInsurer}
      />
    </SendEventWrapper>
  );
};
