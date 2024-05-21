import { FormFields } from '@sravni/cosago-react-library/lib/constants';

import type { DriversCommonFields } from '../../types';
import { isDriversEqualOrBothUndefined } from '../isDriversEqualOrBothUndefined';

const driver1: DriversCommonFields = {
  fullName: { value: 'John Doe' },
  birthday: '1990-01-01',
  licenceNumber: '123456789',
  experienceStartDate: '2010-01-01',
  hasPreviousLicence: FormFields.ConfirmChoice.yes,
};

const driver2: DriversCommonFields = {
  fullName: { value: 'John Doe' },
  birthday: '1990-01-01',
  licenceNumber: '123456789',
  experienceStartDate: '2010-01-01',
  hasPreviousLicence: FormFields.ConfirmChoice.yes,
};

const driver3: DriversCommonFields = {
  fullName: { value: 'Jane Doe' },
  birthday: '1992-01-01',
  licenceNumber: '987654321',
  experienceStartDate: '2012-01-01',
  hasPreviousLicence: FormFields.ConfirmChoice.yes,
  prevLicenceNumber: '555555555',
  prevLastName: 'Smith',
};

describe('WHEN isDriversEqualOrBothUndefined is called', () => {
  it('AND drivers are equal MUST return true', () => {
    expect(isDriversEqualOrBothUndefined(driver1, driver1)).toBe(true);
    expect(isDriversEqualOrBothUndefined(undefined, undefined)).toBe(true);
  });

  it('AND any driver is undefined MUST return false', () => {
    expect(isDriversEqualOrBothUndefined(driver1, undefined)).toBe(false);
    expect(isDriversEqualOrBothUndefined(undefined, driver2)).toBe(false);
  });

  it('AND drivers are not equal MUST return false', () => {
    expect(isDriversEqualOrBothUndefined(driver1, driver3)).toBe(false);
  });
});
