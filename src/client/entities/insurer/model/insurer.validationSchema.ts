import {
  addressScheme,
  passportSeriesNumberScheme,
  validateBirthDateLaterGivenAgeAndEarlierThanNow,
  validateReachedAgeOfMajority,
  validateFullName,
} from '@sravni/cosago-react-library/lib/validationSchemes';
import { object, string } from 'yup';

import { AGE_OF_MAJORITY, AGE_OF_PASSPORT_ISSUE } from 'shared/config/person';
import { FieldErrors } from 'shared/lib/fields';
import type { UserCommonFields } from 'shared/types';

const INSURER_BIRTH_DATE_ERROR = `Cтрахователь не может быть младше ${AGE_OF_MAJORITY} лет`;

const validateOwnerPassportIssueDate = validateBirthDateLaterGivenAgeAndEarlierThanNow<UserCommonFields>(
  'birthday',
  AGE_OF_PASSPORT_ISSUE,
);

export const FormFieldsValidationSchemaInsurer = object<App.Shape<UserCommonFields>>({
  registrationAddressFlat: string().nullable(),
  passportIssueDate: validateOwnerPassportIssueDate(FieldErrors.passportIssueDateError),
  registrationAddress: addressScheme(),
  passportNumber: passportSeriesNumberScheme().required(FieldErrors.requiredError),
  birthday: validateReachedAgeOfMajority(INSURER_BIRTH_DATE_ERROR),
  fullName: validateFullName({ requiredNameError: FieldErrors.personName }),
});
