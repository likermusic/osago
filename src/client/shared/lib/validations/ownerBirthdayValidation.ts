import { Documents } from '@sravni/cosago-react-library/lib/constants';
import { parseToNativeDateFromDateFormatString } from '@sravni/cosago-react-library/lib/utils';
import {
  validateDate,
  validateReachedAgeOfMajorityMotorcycle,
} from '@sravni/cosago-react-library/lib/validationSchemes';
import { subYears } from 'date-fns';

import { AGE_OF_MAJORITY_MOTORCYCLE_LICENSE, CAR_DOCUMENT_AGE_OF_MAJORITY } from 'shared/config/person';

export const OWNER_BIRTH_DATE_ERROR = `Собственник не может быть младше ${AGE_OF_MAJORITY_MOTORCYCLE_LICENSE} лет`;
export const CAR_DOCUMENT_BIRTHDATE_ERROR = `Дата выдачи документа на авто не может быть ранее даты ${CAR_DOCUMENT_AGE_OF_MAJORITY}-летия собственника`;

export const ownerBirthdayValidation = (
  carDocumentIssueDate: string | undefined,
  carDocumentType: Documents.ECarDocumentType | undefined,
) => {
  const schema = validateReachedAgeOfMajorityMotorcycle(OWNER_BIRTH_DATE_ERROR);
  const isCarDocumentTypeSts = carDocumentType === Documents.ECarDocumentType.STS;

  // если есть данные по тачке и документ СТС - валидируем ДР собственника
  if (carDocumentIssueDate && isCarDocumentTypeSts) {
    return schema.concat(
      validateDate({
        notLaterDate: subYears(
          parseToNativeDateFromDateFormatString(carDocumentIssueDate) ?? new Date(),
          CAR_DOCUMENT_AGE_OF_MAJORITY,
        ),
        messageForNotLater: CAR_DOCUMENT_BIRTHDATE_ERROR,
      }),
    );
  }

  return schema;
};
