import { FormFields } from '@sravni/cosago-react-library/lib/constants';

import type { DriversCommonFields } from '../../types';
import { mapDriverExternal } from '../mapDriverExternal';

describe('WHEN mapDriverExternal is called', () => {
  it.each([
    [
      {
        birthday: '01.01.2000',
        experienceStartDate: '01.01.2020',
        fullName: { label: 'Иванов Иван Иванович', value: 'Иванов Иван Иванович' },
        hasPreviousLicence: FormFields.ConfirmChoice.yes,
        licenceNumber: '2345678901',
        prevLastName: 'Петров',
        prevLicenceNumber: '3456789012',
      },
      {
        birthDate: '2000-01-01',
        firstName: 'Иван',
        lastName: 'Иванов',
        license: {
          date: '2020-01-01',
          number: '678901',
          series: '2345',
        },
        middleName: 'Иванович',
        previousInfo: {
          lastName: 'Петров',
          firstName: 'Иван',
          middleName: 'Иванович',
          license: {
            number: '789012',
            series: '3456',
          },
        },
      },
    ],
    [
      {
        birthday: '05.01.1999',
        experienceStartDate: '01.01.2020',
        fullName: { label: 'Шестаков Андрей Романович', value: 'Шестаков Андрей Романович' },
        hasPreviousLicence: FormFields.ConfirmChoice.no,
        licenceNumber: '1234567890',
        prevLastName: null,
        prevLicenceNumber: '',
      },
      {
        birthDate: '1999-01-05',
        firstName: 'Андрей',
        lastName: 'Шестаков',
        license: {
          date: '2020-01-01',
          number: '567890',
          series: '1234',
        },
        middleName: 'Романович',
        previousInfo: {},
      },
    ],
  ])('AND driver is %p, MUST return %p', (driver, expected) => {
    expect(mapDriverExternal(driver as DriversCommonFields)).toEqual(expected);
  });
});
