import { Documents } from '@sravni/cosago-react-library/lib/constants';
import type { ValidationError } from 'yup';
import { mixed, object } from 'yup';

import { CarFieldErrors, validateDocumentIssueDate } from '../carInfo.validationSchema';

describe('WHEN "validateDocumentIssueDate" is called', () => {
  const testSchema = () =>
    object({
      documentIssueDate: validateDocumentIssueDate(),
      documentType: mixed(),
      carManufactureYear: mixed(),
    });

  describe.each([['12.12.2000'], [undefined]])('AND owner birtday is %p', () => {
    it('AND value is empty, MUST generate error', () => {
      let error: Nullable<ValidationError> = null;
      try {
        testSchema().validateSync({
          documentIssueDate: '',
        });
      } catch (e) {
        error = e;
      }

      expect(error?.message).toEqual('Введите дату');
    });

    it('AND document date is before car manufacture date, MUST generate error', () => {
      let error: Nullable<ValidationError> = null;
      try {
        testSchema().validateSync({
          documentIssueDate: '12.12.2019',
          carManufactureYear: { value: '2020' },
          documentType: Documents.ECarDocumentType.STS,
        });
      } catch (e) {
        error = e;
      }

      expect(error?.message).toEqual(CarFieldErrors.incorrectDocumentObtainingDate);
    });

    it('AND document type is EPTS AND date before 01.07.2018 year, MUST generate error', () => {
      let error: Nullable<ValidationError> = null;
      try {
        testSchema().validateSync({
          documentIssueDate: '30.08.2017',
          carManufactureYear: { value: '2017' },
          documentType: Documents.ECarDocumentType.EPTS,
        });
      } catch (e) {
        error = e;
      }

      expect(error?.message).toEqual(CarFieldErrors.incorrectEptsDateStart);
    });
  });

  it('AND all validation passed, MUST NOT throw error', () => {
    expect(
      testSchema().validateSync({
        documentIssueDate: '01.07.2018',
        carManufactureYear: { value: '2018' },
        documentType: Documents.ECarDocumentType.EPTS,
      }),
    ).toEqual({
      documentIssueDate: '01.07.2018',
      carManufactureYear: { value: '2018' },
      documentType: Documents.ECarDocumentType.EPTS,
    });
  });
});
