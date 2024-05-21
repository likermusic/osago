import { formatDateString } from '@sravni/cosago-react-library/lib/utils';

import type { TUserForMapping } from '../../types/TQuerySupportedForMapping';
import { mapCalculationQueryToFormUser } from '../mapCalculationQueryToFormUser';

describe('WHEN "mapCalculationQueryToFormInsurer" is called', () => {
  const queryInsurer = {
    passport: {
      issueDate: new Date().toISOString(),
      series: '1234',
      number: '345678',
    },
    birthDate: new Date().toISOString(),
    address: {
      formattedAddress: 'TEST ADDRESS STRING',
      formattedFiasLevel: '8',
      data: {
        fiasLevel: '8',
      },
    },
    fullName: 'Иванов Иван Иванович',
  };

  it.each([[null], [undefined], [{}]])('AND data was not provided, MUST return default state', (input) => {
    expect(mapCalculationQueryToFormUser(input as TUserForMapping)).toEqual({
      birthday: '',
      fullName: null,
      passportIssueDate: '',
      passportNumber: '',
      registrationAddress: null,
      registrationAddressFlat: '',
    });
  });

  it('AND data was fully provided, MUST return car info redux state', () => {
    expect(mapCalculationQueryToFormUser(queryInsurer as TUserForMapping)).toEqual({
      birthday: formatDateString(queryInsurer.birthDate),
      fullName: {
        label: queryInsurer.fullName,
        value: queryInsurer.fullName,
      },
      passportIssueDate: formatDateString(queryInsurer.passport.issueDate),
      passportNumber: '1234345678',
      registrationAddress: {
        label: queryInsurer.address.formattedAddress,
        value: queryInsurer.address.formattedAddress,
        data: {
          fias_level: '8',
        },
      },
      registrationAddressFlat: '',
    });
  });

  it('AND data was provided partially, MUST return car info redux state', () => {
    expect(
      mapCalculationQueryToFormUser({
        ...queryInsurer,
        passport: null,
        address: null,
      } as unknown as TUserForMapping),
    ).toEqual({
      birthday: formatDateString(queryInsurer.birthDate),
      fullName: {
        label: queryInsurer.fullName,
        value: queryInsurer.fullName,
      },
      passportIssueDate: '',
      passportNumber: '',
      registrationAddress: null,
      registrationAddressFlat: '',
    });
  });
});
