import { mixed, object, ValidationError } from 'yup';

import type { TVehicleCategories } from 'commonTypes/categories';

import { FieldErrors } from 'shared/lib/fields';

import { validateDriverLicenseIssueDate } from '../validateDriverLicenseIssueDate';

const testSchema = (category: TVehicleCategories) =>
  object({
    experienceStartDate: validateDriverLicenseIssueDate(category),
    birthday: mixed(),
  });

const INCORRECT_DATE = 'Некорректная дата';
const EMPTY_DATE = 'Введите дату';

describe('WHEN "validateDriverLicenseIssueDate" is called', () => {
  describe.each(['A', 'B', 'C', 'D', 'E'] as const)('AND independent on category as %p', (category) => {
    it('AND date is empty object MUST throw error', () => {
      expect(() => testSchema(category).validateSync({})).toThrow(new ValidationError(EMPTY_DATE));
    });

    it.each([undefined, null, ''])('AND date falsy as %p value MUST throw error', (value) => {
      expect(() => testSchema(category).validateSync({ experienceStartDate: value, birthday: value })).toThrow(
        new ValidationError(EMPTY_DATE),
      );
    });

    it('AND date is incorrect MUST throw error', () => {
      expect(() => testSchema(category).validateSync({ experienceStartDate: '1' })).toThrow(
        new ValidationError(INCORRECT_DATE),
      );
    });
  });

  describe.each(['B', 'C', 'D', 'E'] as const)('AND vehicle is car', (category) => {
    it('AND driver is younger then 18 MUST throw error', () => {
      expect(() =>
        testSchema(category).validateSync({ experienceStartDate: '11.11.2017', birthday: '11.11.2000' }),
      ).toThrow(new ValidationError(FieldErrors.experienceError.car(category)));
    });

    it('AND driver is older then 18 MUST be valid date', () => {
      expect(testSchema(category).isValidSync({ experienceStartDate: '12.11.2018', birthday: '11.11.2000' })).toEqual(
        true,
      );
    });
  });

  describe('AND vehicle is motocycle', () => {
    const category = 'A';

    it('AND driver is younger then 16 MUST throw error', () => {
      expect(() =>
        testSchema(category).validateSync({ experienceStartDate: '11.11.2015', birthday: '11.11.2000' }),
      ).toThrow(new ValidationError(FieldErrors.experienceError.motorcycle));
    });

    it('AND driver is older then 16 MUST be valid date', () => {
      expect(testSchema(category).isValidSync({ experienceStartDate: '12.11.2016', birthday: '11.11.2000' })).toEqual(
        true,
      );
    });
  });
});
