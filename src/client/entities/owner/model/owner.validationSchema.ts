import type { Documents } from '@sravni/cosago-react-library/lib/constants';
import {
  addressScheme,
  passportSeriesNumberScheme,
  validateFullName,
  validateBirthDateLaterGivenAgeAndEarlierThanNow,
} from '@sravni/cosago-react-library/lib/validationSchemes';
import { object, string } from 'yup';

import { AGE_OF_PASSPORT_ISSUE } from 'shared/config/person';
import { ownerBirthdayValidation } from 'shared/lib';
import { FieldErrors } from 'shared/lib/fields';

import type { OwnerCommonFields } from 'entities/owner';

const validateOwnerPassportIssueDate = validateBirthDateLaterGivenAgeAndEarlierThanNow<OwnerCommonFields>(
  'birthday',
  AGE_OF_PASSPORT_ISSUE,
);

type TCrossFormFieldsValidationSchemaCarOwner = {
  carDocumentIssueDate: string | undefined;
  carDocumentType: Documents.ECarDocumentType | undefined;
};

export const FormFieldsValidationSchemaCarOwner = ({
  carDocumentIssueDate,
  carDocumentType,
}: TCrossFormFieldsValidationSchemaCarOwner) =>
  object<App.Shape<OwnerCommonFields>>({
    birthday: ownerBirthdayValidation(carDocumentIssueDate, carDocumentType),
    fullName: validateFullName({ requiredNameError: FieldErrors.personName }),
    passportIssueDate: validateOwnerPassportIssueDate(FieldErrors.passportIssueDateError),
    passportNumber: passportSeriesNumberScheme().required(FieldErrors.requiredError),
    policyHolder: string().required(FieldErrors.requiredError),
    registrationAddress: addressScheme(),
    registrationAddressFlat: string().nullable(),
  });
