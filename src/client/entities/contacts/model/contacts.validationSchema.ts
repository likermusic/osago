import { emailScheme, phoneScheme, smsCodeSchema } from '@sravni/cosago-react-library/lib/validationSchemes';
import { boolean, object } from 'yup';

import { FieldErrors } from 'shared/lib/fields';

import type { ContactsCommonFields } from '../types';

const EMPTY_EMAIL_ERROR_TEXT = 'Введите e-mail';
// TODO: вынести в сосагу https://sravni-corp.atlassian.net/browse/OS-7824
export const FormFieldsValidationSchemaAuthentication = object<App.Shape<ContactsCommonFields>>()
  .shape({
    email: emailScheme().required(EMPTY_EMAIL_ERROR_TEXT),
    mobilePhone: phoneScheme(),
    smsCode: smsCodeSchema,
  })
  .required();

export const FormFieldsValidationSchemaAuthenticationWithUserAgreement = object<App.Shape<ContactsCommonFields>>()
  .shape({
    email: emailScheme().required(EMPTY_EMAIL_ERROR_TEXT),
    mobilePhone: phoneScheme(),
    smsCode: smsCodeSchema,
    userAgreement: boolean().isTrue(FieldErrors.userAgreement).required(FieldErrors.userAgreement),
  })
  .required();
