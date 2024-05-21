import type { IFieldConfiguration } from '@sravni/cosago-react-library/lib/types';
import type React from 'react';

import { SmsCode } from 'entities/authSms';
import type { ContactsCommonFields } from 'entities/contacts';
import { hintWrapperHOC } from 'entities/hintNotification';

import { EmailAutocomplete } from '../fields/EmailAutocomplete';
import { PhoneNumber } from '../fields/PhoneNumber';
import { UserAgreement } from '../fields/UserAgreement';

import { FormFieldsText, FormHints, userAgreementText } from './FormBody.texts';

interface ICarInfoMobileConfig extends Omit<IFieldConfiguration, 'fieldName'> {
  fieldName: keyof ContactsCommonFields;
}

export const FormFieldsControls: Record<keyof ContactsCommonFields, React.ReactNode> = {
  email: hintWrapperHOC({ hintText: FormHints.email.text })(EmailAutocomplete),
  mobilePhone: hintWrapperHOC({ hintText: FormHints.mobilePhone.text })(PhoneNumber),
  userAgreement: UserAgreement,
  smsCode: SmsCode,
};

export const FormFieldsMobileSequence: ICarInfoMobileConfig[] = [
  {
    fieldName: 'userAgreement',
    fieldTitle: userAgreementText.mobileTitle,
    required: true,
  },
  {
    fieldName: 'email',
    fieldTitle: FormFieldsText.email,
    required: true,
  },
  {
    fieldName: 'mobilePhone',
    fieldTitle: FormFieldsText.mobilePhone,
    required: true,
  },
  {
    fieldName: 'smsCode',
    fieldTitle: FormFieldsText.smsCode,
    required: true,
  },
];
