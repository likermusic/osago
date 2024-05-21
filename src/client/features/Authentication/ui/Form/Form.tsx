import type { FC } from 'react';

import { useAppDispatch, useAppSelector } from 'shared/lib/redux';
import { sendEventCarFieldsValueChange, sendEventSubmitContactsForm } from 'shared/lib/sendGAEvents';
import { SendEventWrapper } from 'shared/lib/sendGAEvents/SendEventWrapper';
import { useCopySelectorToState } from 'shared/lib/useCopySelectorToState';

import { shouldShowUserAgreementSelector } from 'entities/authSms';
import {
  selectContactsData,
  type ContactsCommonFields,
  setContactsData,
  selectIsContactsFilledByEsia,
  FormFieldsValidationSchemaAuthenticationWithUserAgreement,
  FormFieldsValidationSchemaAuthentication,
} from 'entities/contacts';

import { ContactsFormViewHoc } from '../FormBody/FormBody';
import { FormFieldsControls } from '../FormBody/FormBody.config';
import { FormFieldsText } from '../FormBody/FormBody.texts';

export const Form: FC<IFormPopup> = ({
  isDialog = false,
  isLoading,
  onClose,
  setHeader,
  isFormForceOpened,
  onFormSubmit,
}) => {
  const formData = useCopySelectorToState(selectContactsData);
  const dispatch = useAppDispatch();
  const isContactsFilledByEsia = useAppSelector(selectIsContactsFilledByEsia);
  const shouldShowUserAgreement = useAppSelector(shouldShowUserAgreementSelector);

  const handleContactsData = async (actualData: ContactsCommonFields, type: string) => {
    if (type === 'fullFilled') {
      // данные текущего шага, сетим в стор в последний момент иначе срабатывает рекалькуляция шагов в хуке useStepper,
      // а данные следующего шага еще в стор не записывались и полученное значение текущего шага может быть некорректным из-за неполных данных в сторе
      dispatch(setContactsData({ data: actualData, isFullFilled: true }));

      !isDialog && sendEventSubmitContactsForm();

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
          eventAction: 'Изменение контактных данных',
          // евент не знает о типе fieldName поэтому нужен as
          fieldName: String(formData[fieldName as keyof ContactsCommonFields]),
          previousValue,
          newValue,
        });
      }}
    >
      <ContactsFormViewHoc
        isDialog={isDialog}
        onDataChanged={handleContactsData}
        defaultData={formData}
        isLoading={isLoading}
        additionalProps={{
          setHeader,
          isFormForceOpened,
          isContactsFilledByEsia,
        }}
        validationSchema={
          shouldShowUserAgreement
            ? FormFieldsValidationSchemaAuthenticationWithUserAgreement
            : FormFieldsValidationSchemaAuthentication
        }
        formFieldsControls={FormFieldsControls}
        formLabels={FormFieldsText}
      />
    </SendEventWrapper>
  );
};
