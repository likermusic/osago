import { MAPPED_CLIENT_DATA, CLIENT_DATA } from 'mocks/mappingOldClientData';

import { fixAndMapOldClientData } from '../fixAndMapOldClientData';
import type { IClientDataState } from '../types';

const OLD_VAZ_NAME = {
  A777АА777: {
    bodyNumber: '',
    brand: 'LADA (ВАЗ)',
    model: 'Priora',
    brandId: 50,
    carIdentifier: 'vin',
    chassisNumber: '',
    modelId: 100004274,
    modification: null,
    power: '68 л.с. / 50,01 кВт',
    year: '1999',
    vin: 'BSDSVDB1221233223',
    policyStartDate: '16.12.2023',
    recommendedPolicyStartDate: '16.12.2023',
    auto: {
      vehicleNumber: 'A777АА777',
      document: 'sts',
      documentObtainingDate: '11.11.2022',
      pts: '',
      sts: '1132112132',
      epts: '',
    },
    contacts: {
      email: 'dsdsds@mail.ru',
      phone: '79060499764',
    },
    drivers: [
      {
        firstName: 'Надежда',
        lastName: 'Бикташева',
        middleName: 'Николаевна',
        birthDate: '20.06.1986',
        drivingLicense: '6627 704872',
        experienceStartDate: '31.12.2017',
        hasOldLicense: false,
        oldDrivingLicense: '',
        oldLastName: '',
      },
    ],
    insurerOwner: {
      insurerIsOwner: true,
      user: {
        firstName: 'Надежда',
        lastName: 'Бикташева',
        middleName: 'Николаевна',
        birthDate: '20.06.1986',
        passportNumber: '1211221122',
        passportObtainingDate: '12.12.2022',
        address: {
          source: {
            data: {
              fias_level: '8',
              region: 'Москва',
            },
          },
          value: 'г Москва, ул Профсоюзная, д 12',
        },
        addressFlat: '123',
      },
    },
    selectedDrivers: [true],
    unlimitedDrivers: false,
    vehicleCategory: 'B',
  } as IClientDataState,
};

const MAPPED_TO_NEW_VAZ_NAME = {
  A777АА777: {
    bodyNumber: '',
    brandId: 50,
    modification: undefined,
    carDocument: {
      date: '11.11.2022',
      documentType: 'sts',
      number: '112132',
      series: '1132',
    },
    carNumber: 'A777АА777',
    chassisNumber: '',
    driversInfo: {
      driverAmount: 'limited',
      drivers: [
        {
          birthDate: '1986-06-20',
          firstName: 'Надежда',
          fullName: 'Бикташева Надежда Николаевна',
          lastName: 'Бикташева',
          license: {
            date: '2017-12-31',
            number: '704872',
            series: '6627',
          },
          middleName: 'Николаевна',
          previousInfo: {
            firstName: 'Надежда',
            fullName: 'Бикташева Надежда Николаевна',
            lastName: '',
            license: {
              number: '',
              series: '',
            },
            middleName: 'Николаевна',
          },
        },
      ],
    },
    enginePower: 68,
    insurer: {
      address: {
        data: {
          flatNumber: '123',
        },
        formattedAddress: 'г Москва, ул Профсоюзная, д 12',
        formattedFiasLevel: '8',
      },
      birthDate: '1986-06-20',
      email: 'dsdsds@mail.ru',
      firstName: 'Надежда',
      fullName: 'Бикташева Надежда Николаевна',
      lastName: 'Бикташева',
      middleName: 'Николаевна',
      passport: {
        issueDate: '2022-12-12',
        number: '221122',
        series: '1211',
      },
      phone: '79060499764',
    },
    modelId: 100004274,
    owner: {
      address: {
        data: {
          flatNumber: '123',
        },
        formattedAddress: 'г Москва, ул Профсоюзная, д 12',
        formattedFiasLevel: '8',
      },
      birthDate: '1986-06-20',
      firstName: 'Надежда',
      fullName: 'Бикташева Надежда Николаевна',
      lastName: 'Бикташева',
      middleName: 'Николаевна',
      passport: {
        issueDate: '2022-12-12',
        number: '221122',
        series: '1211',
      },
    },
    policyStartDate: '16.12.2023',
    vehicleCategory: 'B',
    vin: 'BSDSVDB1221233223',
    year: 1999,
  },
};

describe('WHEN fixAndMapOldClientData is called', () => {
  it('AND  nothing to replace MUST not replace value in object', () => {
    expect(fixAndMapOldClientData(CLIENT_DATA)).toStrictEqual(MAPPED_CLIENT_DATA);
  });

  it('MUST replace value in object', () => {
    expect(fixAndMapOldClientData({ ...OLD_VAZ_NAME, ...CLIENT_DATA })).toStrictEqual({
      ...MAPPED_TO_NEW_VAZ_NAME,
      ...MAPPED_CLIENT_DATA,
    });
  });
});
