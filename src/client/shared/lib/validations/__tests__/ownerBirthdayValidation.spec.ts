import { Documents } from '@sravni/cosago-react-library/lib/constants';
import { formatDateString } from '@sravni/cosago-react-library/lib/utils';
import { subYears } from 'date-fns';
import type { ValidationError } from 'yup';

import { CAR_DOCUMENT_BIRTHDATE_ERROR, OWNER_BIRTH_DATE_ERROR, ownerBirthdayValidation } from 'shared/lib';

describe('WHEN "ownerBirthdayValidation" is called', () => {
  it.each([[formatDateString(new Date().toISOString())], [undefined], ['']])(
    'AND "carDocumentIssueDate" provided as %p, AND "birthday" is not valid, MUST generate error',
    (carDocumentIssueDate) => {
      let error: Nullable<ValidationError> = null;
      try {
        ownerBirthdayValidation(carDocumentIssueDate, Documents.ECarDocumentType.STS).validateSync(
          formatDateString(subYears(new Date(), 15).toISOString()),
        );
      } catch (e) {
        error = e;
      }

      expect(error?.message).toEqual(OWNER_BIRTH_DATE_ERROR);
    },
  );

  it('AND "carDocumentIssueDate" provided, AND "birthday" is not valid as 14.12.2022, MUST generate error', () => {
    let error: Nullable<ValidationError> = null;
    try {
      ownerBirthdayValidation('14.12.2022', Documents.ECarDocumentType.STS).validateSync(
        formatDateString(subYears(new Date(), 17).toISOString()),
      );
    } catch (e) {
      error = e;
    }

    expect(error?.message).toEqual(CAR_DOCUMENT_BIRTHDATE_ERROR);
  });

  it('AND "birthday" is valid, MUST return valid birthday', () => {
    const validDate = formatDateString(subYears(new Date(), 18).toISOString());
    expect(ownerBirthdayValidation(undefined, undefined).validateSync(validDate)).toEqual(validDate);
  });

  describe('AND "carDocumentIssueDate" is  presented', () => {
    it.each([
      ['14.12.2001', '14.12.2001'],
      ['14.12.2003', '14.12.2003'],
      ['14.12.2003', '14.12.2005'],
      ['14.12.2003', '14.12.2018'],
    ])(
      'AND "birthday" is %p AND "carDocumentIssueDate" is %p, MUST throw error',
      (birthday: string, carDocumentIssueDate: string) => {
        let error: Nullable<ValidationError> = null;
        try {
          ownerBirthdayValidation(carDocumentIssueDate, Documents.ECarDocumentType.STS).validateSync(birthday);
        } catch (e) {
          error = e;
        }

        expect(error?.message).toEqual(CAR_DOCUMENT_BIRTHDATE_ERROR);
      },
    );

    it('AND "birthday" is let then "carDocumentIssueDate" AND Document type is PTS or EPTS, MUST NOT throw error', () => {
      const validBirthday = '14.12.2005';
      const carDocumentDate = '14.12.2018';

      expect(
        ownerBirthdayValidation(carDocumentDate, Documents.ECarDocumentType.PTS).validateSync(validBirthday),
      ).toEqual(validBirthday);
      expect(
        ownerBirthdayValidation(carDocumentDate, Documents.ECarDocumentType.EPTS).validateSync(validBirthday),
      ).toEqual(validBirthday);
    });

    it('AND "birthday" is older then "carDocumentIssueDate" + 16, MUST NOT throw error', () => {
      const validBirthday = '14.12.2002';
      expect(ownerBirthdayValidation('14.12.2018', Documents.ECarDocumentType.STS).validateSync(validBirthday)).toEqual(
        validBirthday,
      );
    });
  });
});
