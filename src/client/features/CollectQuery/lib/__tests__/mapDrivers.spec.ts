import { FormFields } from '@sravni/cosago-react-library/lib/constants';

import type { DriversCommonFields } from 'entities/drivers';
import { PolicyHolderType } from 'entities/owner';
import type { OwnerCommonFields } from 'entities/owner';

import { mapDrivers } from '../mapDrivers';

describe('WHEN "mapDrivers" is called', () => {
  const OWNER: OwnerCommonFields = {
    birthday: '01.01.1999',
    fullName: { label: 'Сидров Сидр Сидорович', value: 'Сидоров Сидр Сидорович' },
    passportNumber: '1234567890',
    passportIssueDate: '01.01.2021',
    policyHolder: PolicyHolderType.Other,
    registrationAddress: {
      data: {
        fias_level: '8',
        region: 'Москва',
      },
      label: 'г Москва, ш Богородское, д 18 стр 11',
      value: 'г Москва, ш Богородское, д 18 стр 11',
    },
    registrationAddressFlat: '1',
  };

  const DRIVERS_STATE = {
    '1337': {
      isFullFilled: true,
      data: {
        birthday: '05.01.1999',
        experienceStartDate: '01.01.2020',
        fullName: { label: 'Шестаков Андрей Романович', value: 'Шестаков Андрей Романович' },
        hasPreviousLicence: FormFields.ConfirmChoice.no,
        licenceNumber: '1234567890',
        prevLastName: null,
        prevLicenceNumber: '',
      } as DriversCommonFields,
    },
    DRIVER_ID_WITH_OLD_LICENSE: {
      isFullFilled: true,
      data: {
        birthday: '01.01.2000',
        experienceStartDate: '01.01.2020',
        fullName: { label: 'Иванов Иван Иванович', value: 'Иванов Иван Иванович' },
        hasPreviousLicence: FormFields.ConfirmChoice.yes,
        licenceNumber: '2345678901',
        prevLastName: 'Петров',
        prevLicenceNumber: '3456789012',
      } as DriversCommonFields,
    },
  };

  const DRIVERS_STATE_NORMALIZED = [
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
  ];

  const OWNER_STATE_NORMALIZED = {
    birthDate: '1999-01-01',
    firstName: 'Сидр',
    lastName: 'Сидоров',
    middleName: 'Сидорович',
    passport: {
      issueDate: '2021-01-01',
      number: '567890',
      series: '1234',
    },
  };

  it('AND non-multidrive MUST normalize correctly', () => {
    const driversInput = {
      isMultiDrive: false,
      multipleFormsData: DRIVERS_STATE,
    };
    const expected = {
      driverAmount: 'limited',
      drivers: DRIVERS_STATE_NORMALIZED,
      unnamedDrivers: { age: 0, experience: 0 },
    };
    expect(mapDrivers(driversInput, OWNER)).toEqual(expected);
  });

  it('AND multidrive MUST normalize correctly', () => {
    const driversInput = {
      isMultiDrive: true,
      multipleFormsData: DRIVERS_STATE,
    };
    const expected = {
      driverAmount: 'unlimited',
      drivers: [OWNER_STATE_NORMALIZED],
      unnamedDrivers: { age: 0, experience: 0 },
    };
    expect(mapDrivers(driversInput, OWNER)).toEqual(expected);
  });
});
