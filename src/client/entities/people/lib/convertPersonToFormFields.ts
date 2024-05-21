import { FormFields } from '@sravni/cosago-react-library/lib/constants';

import type { TConvertPersonToFormFieldsResult, TPerson } from '../types';

/**
 * Так как в дизайн системе undefined не обновляет значение поля,
 * следует использовать пустые строки вместо undefined
 * */
export const convertPersonToFormFields = (person: TPerson): TConvertPersonToFormFieldsResult => ({
  phone: person?.phone ?? '',
  email: person?.email ?? '',
  birthday: person.birthday ?? '',
  fullName: {
    label: person.fullName,
    value: person.fullName,
  },
  passportNumber: person.passportNumber ?? '',
  passportIssueDate: person.passportIssueDate ?? '',
  registrationAddress: person.address?.value
    ? {
        label: person.address?.value,
        value: person.address?.value,
        data: person.address?.source?.data,
      }
    : null,
  registrationAddressFlat: person.addressFlat ?? '',
  licenceNumber: person.licenceNumber ?? '',
  experienceStartDate: person.experienceStartDate ?? '',
  hasPreviousLicence: person?.hasPreviousLicence ? FormFields.ConfirmChoice.yes : FormFields.ConfirmChoice.no,
});
