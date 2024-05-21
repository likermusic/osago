import { formatDateString } from '@sravni/cosago-react-library/lib/utils';

import type { Query } from 'commonTypes/api/query';

import { PolicyHolderType } from 'entities/owner';

import { mapCalculationQueryToFormOwner } from '../mapCalculationQueryToFormOwner';

describe('WHEN "mapCalculationQueryToFormOwner" is called', () => {
  const query = {
    owner: {
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
    },
    insurer: {
      fullName: 'Иванов Иван Иванович',
    },
  };

  it.each([[null], [undefined], [{}]])('AND data was not provided, MUST return default state', (input) => {
    expect(mapCalculationQueryToFormOwner(input as Query.TRestoreCalculationQueryResponse)).toEqual({
      birthday: '',
      fullName: null,
      passportIssueDate: '',
      passportNumber: '',
      policyHolder: PolicyHolderType.Default,
      registrationAddress: null,
      registrationAddressFlat: '',
    });
  });

  it('AND data was fully provided, MUST return car info redux state', () => {
    expect(mapCalculationQueryToFormOwner(query as Query.TRestoreCalculationQueryResponse)).toEqual({
      birthday: formatDateString(query.owner.birthDate),
      fullName: {
        label: query.owner.fullName,
        value: query.owner.fullName,
      },
      passportIssueDate: formatDateString(query.owner.passport.issueDate),
      passportNumber: '1234345678',
      policyHolder: 'Owner',
      registrationAddress: {
        label: query.owner.address.formattedAddress,
        value: query.owner.address.formattedAddress,
        data: {
          fias_level: '8',
        },
      },
      registrationAddressFlat: '',
    });
  });

  it('AND data was provided partially, MUST return car info redux state', () => {
    expect(
      mapCalculationQueryToFormOwner({
        ...query,
        owner: {
          ...query.owner,
          passport: null,
          address: null,
        },
        insurer: null,
      } as unknown as Query.TRestoreCalculationQueryResponse),
    ).toEqual({
      birthday: formatDateString(query.owner.birthDate),
      fullName: {
        label: query.owner.fullName,
        value: query.owner.fullName,
      },
      passportIssueDate: '',
      passportNumber: '',
      policyHolder: PolicyHolderType.Default,
      registrationAddress: null,
      registrationAddressFlat: '',
    });
  });
  it('AND insurer is driver MUST set policyHolder to driver', () => {
    expect(
      mapCalculationQueryToFormOwner({
        ...query,
        driversInfo: {
          drivers: [
            {
              fullName: 'Шестаков Андрей Романович',
            },
            {
              fullName: 'Сидоров Сидр Сидорович',
            },
            {
              fullName: 'Иванов Иван Иванович',
            },
          ],
        },
        owner: {
          ...query.owner,
          fullName: 'Петров Петр Петрович',
        },
      }),
    ).toEqual({
      birthday: formatDateString(query.owner.birthDate),
      fullName: {
        label: 'Петров Петр Петрович',
        value: 'Петров Петр Петрович',
      },
      passportIssueDate: formatDateString(query.owner.passport.issueDate),
      passportNumber: '1234345678',
      policyHolder: '2',
      registrationAddress: {
        label: query.owner.address.formattedAddress,
        value: query.owner.address.formattedAddress,
        data: {
          fias_level: '8',
        },
      },
      registrationAddressFlat: '',
    });
  });
});
