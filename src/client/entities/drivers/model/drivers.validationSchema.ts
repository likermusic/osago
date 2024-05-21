import type { Documents } from '@sravni/cosago-react-library/lib/constants';
import { FormFields } from '@sravni/cosago-react-library/lib/constants';
import {
  addressScheme,
  confirmChoiceScheme,
  passportSeriesNumberScheme,
  stsPtsDriverLicenceSeriesNumberScheme,
  validateBirthDateLaterGivenAgeAndEarlierThanNow,
  validateConditionaly,
  validateFullName,
  validateReachedAgeOfMajorityMotorcycle,
} from '@sravni/cosago-react-library/lib/validationSchemes';
import type { AnySchema } from 'yup';
import { mixed, object, string } from 'yup';

import { AGE_OF_PASSPORT_ISSUE } from 'shared/config/person';
import { ownerBirthdayValidation } from 'shared/lib';
import { FieldErrors } from 'shared/lib/fields';

import { validateDriverLicenseIssueDate } from 'entities/drivers/lib/validateDriverLicenseIssueDate';

import { UpdateDriversTexts } from '../config/updateDriversTexts';
import type { DriversCommonFields, UpdateDriversWithSwitchersForm } from '../types';

const validateConditionallyIfLicenceWasChangedInThisYear = (schemaThen: AnySchema, schemaOtherwise: AnySchema) =>
  validateConditionaly<DriversCommonFields>(
    (v) => v === FormFields.ConfirmChoice.yes,
    schemaThen,
    schemaOtherwise,
  )('hasPreviousLicence');

const validationObject = (category: string | undefined) => ({
  birthday: validateReachedAgeOfMajorityMotorcycle(UpdateDriversTexts.validationErrors.driverBirthDateError),
  experienceStartDate: validateDriverLicenseIssueDate(category),
  fullName: validateFullName({ requiredNameError: FieldErrors.personName }),
  hasPreviousLicence: confirmChoiceScheme(),
  licenceNumber: stsPtsDriverLicenceSeriesNumberScheme('license').required(FieldErrors.requiredError),
  prevLastName: validateConditionallyIfLicenceWasChangedInThisYear(
    string().required(FieldErrors.requiredError),
    mixed(),
  ),
  prevLicenceNumber: validateConditionallyIfLicenceWasChangedInThisYear(
    stsPtsDriverLicenceSeriesNumberScheme('license').required(FieldErrors.requiredError),
    mixed(),
  ),
  kbm: mixed(),
});

export const FormFieldsValidationSchemaLimitedUpdateDrivers = (category: string | undefined) =>
  object<App.Shape<DriversCommonFields>>(validationObject(category));

const validateDriverPassportIssueDate = validateBirthDateLaterGivenAgeAndEarlierThanNow<DriversCommonFields>(
  'birthday',
  AGE_OF_PASSPORT_ISSUE,
);

const validateConditionalIfSwitcher = (schemaThen: AnySchema, schemaOtherwise: AnySchema) =>
  validateConditionaly<UpdateDriversWithSwitchersForm>(
    (isDriverOwner, isDriverInsurer) => isDriverOwner || isDriverInsurer,
    schemaThen,
    schemaOtherwise,
  )('isDriverOwner', 'isDriverInsurer');

const validateConditionalIfOwner = (schemaThen: AnySchema, schemaOtherwise: AnySchema) =>
  validateConditionaly<UpdateDriversWithSwitchersForm>(
    (isDriverOwner) => isDriverOwner,
    schemaThen,
    schemaOtherwise,
  )('isDriverOwner');

type DriversValidationSchema = {
  carDocumentIssueDateValue: string | undefined;
  carDocumentType: Documents.ECarDocumentType | undefined;
  category: string | undefined;
};
export const FormWithSwitchersFieldsValidationSchemaLimitedUpdateDrivers = ({
  carDocumentIssueDateValue,
  carDocumentType,
  category,
}: DriversValidationSchema) =>
  object<App.Shape<UpdateDriversWithSwitchersForm>>({
    ...validationObject(category),
    // TODO: во вторую итерацию добавить для страхователя https://sravni-corp.atlassian.net/browse/OS-10278
    birthday: validateConditionalIfOwner(
      ownerBirthdayValidation(carDocumentIssueDateValue, carDocumentType),
      validationObject(category).birthday,
    ),
    isDriverOwner: mixed(),
    isDriverInsurer: mixed(),
    passportNumber: validateConditionalIfSwitcher(
      passportSeriesNumberScheme().required(FieldErrors.requiredError),
      mixed(),
    ),
    passportIssueDate: validateConditionalIfSwitcher(
      validateDriverPassportIssueDate(FieldErrors.passportIssueDateError),
      mixed(),
    ),
    registrationAddress: validateConditionalIfSwitcher(addressScheme(), mixed()),
    registrationAddressFlat: validateConditionalIfSwitcher(string().nullable(), mixed()),
  });
export const FormFieldsValidationSchemaMultiDrive = object<App.Shape<{}>>({});
