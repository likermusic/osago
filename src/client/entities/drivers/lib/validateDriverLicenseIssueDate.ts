import { validateBirthDateLaterGivenAgeAndEarlierThanNow } from '@sravni/cosago-react-library/lib/validationSchemes';

import { AGE_OF_MAJORITY, AGE_OF_MAJORITY_MOTORCYCLE_LICENSE } from 'shared/config/person';
import { FieldErrors } from 'shared/lib/fields';

import type { DriversCommonFields } from 'entities/drivers';

const validateDriverLicenseIssueDateCategoryA = validateBirthDateLaterGivenAgeAndEarlierThanNow<DriversCommonFields>(
  'birthday',
  AGE_OF_MAJORITY_MOTORCYCLE_LICENSE,
);

const validateDriverLicenseIssueDateAllCategories =
  validateBirthDateLaterGivenAgeAndEarlierThanNow<DriversCommonFields>('birthday', AGE_OF_MAJORITY);

export const validateDriverLicenseIssueDate = (category: string | undefined) => {
  if (category === 'A') return validateDriverLicenseIssueDateCategoryA(FieldErrors.experienceError.motorcycle);

  return validateDriverLicenseIssueDateAllCategories(FieldErrors.experienceError.car(category));
};
