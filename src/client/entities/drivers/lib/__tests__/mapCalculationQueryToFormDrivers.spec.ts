import { formatDateString } from '@sravni/cosago-react-library/lib/utils';

import { mockedNanoid } from 'mocks/helpers';

import type { TQuerySupportedForMapping } from 'shared/types/TQuerySupportedForMapping';

import { mapCalculationQueryToFormDrivers } from '../mapCalculationQueryToFormDrivers';

describe('WHEN "mapCalculationQueryToFormDrivers" is called', () => {
  const driver = {
    fullName: 'Иванов Иван Иванович',
    birthDate: '1973-01-04T00:00:00',
    previousInfo: {
      lastName: 'Петрович',
      license: {
        series: '1111',
        number: '615876',
      },
    },
    license: {
      date: '2008-10-05T00:00:00',
      series: '1423',
      number: '611276',
    },
  };

  const query = {
    driversInfo: {
      driverAmount: 'unlimited',
      drivers: [driver],
    },
  };

  it.each([[null], [undefined], [{}]])(
    'AND data was not provided, MUST return default state with empty driver',
    (input) => {
      const nanoId = 'nanoId';
      mockedNanoid.mockReturnValue(nanoId);

      expect(mapCalculationQueryToFormDrivers(input as TQuerySupportedForMapping)).toEqual({
        drivers: {
          [nanoId]: {
            data: null,
            isFullFilled: false,
          },
        },
        isMultiDrive: false,
      });
    },
  );

  it('AND data was fully provided, MUST return car info redux state with isFullFilled = true', () => {
    expect(mapCalculationQueryToFormDrivers(query as TQuerySupportedForMapping)).toEqual({
      drivers: {
        '0': {
          data: {
            birthday: formatDateString(driver.birthDate),
            experienceStartDate: formatDateString(driver.license.date),
            fullName: {
              label: driver.fullName,
              value: driver.fullName,
            },
            hasPreviousLicence: 'yes',
            licenceNumber: '1423611276',
            prevLastName: driver.previousInfo.lastName,
            prevLicenceNumber: '1111615876',
          },
          isFullFilled: true,
        },
      },
      isMultiDrive: true,
    });
  });

  it('AND data was provided partially, MUST return car info redux state with isFullFilled = false', () => {
    expect(
      mapCalculationQueryToFormDrivers({
        driversInfo: {
          driverAmount: 'limited',
          drivers: [
            {
              ...driver,
              previousInfo: null,
              license: null,
            },
          ],
        },
      } as unknown as TQuerySupportedForMapping),
    ).toEqual({
      drivers: {
        '0': {
          data: {
            birthday: formatDateString(driver.birthDate),
            experienceStartDate: '',
            fullName: {
              label: driver.fullName,
              value: driver.fullName,
            },
            hasPreviousLicence: 'no',
            licenceNumber: '',
            prevLastName: null,
            prevLicenceNumber: '',
          },
          isFullFilled: false,
        },
      },
      isMultiDrive: false,
    });
  });
});
