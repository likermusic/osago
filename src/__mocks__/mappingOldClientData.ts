import type { IClientDataState } from 'shared/lib/localStorageMethods/types';

export const CLIENT_DATA = {
  А197МВ197: {
    bodyNumber: '',
    brand: 'Hyundai',
    brandId: 48,
    carIdentifier: 'vin',
    chassisNumber: '',
    model: 'Aslan',
    modelId: 100052931,
    modification: null,
    power: '270 л.с. / 198,59 кВт',
    year: '2021',
    vin: 'DSDSM211212211212',
    policyStartDate: '15.12.2023',
    recommendedPolicyStartDate: '15.12.2023',
    auto: {
      vehicleNumber: 'А197МВ197',
      document: 'sts',
      documentObtainingDate: '12.12.2022',
      pts: '',
      sts: '1221212212',
      epts: '',
    },
    contacts: {
      email: '',
      phone: '',
    },
    drivers: [
      {
        firstName: 'Григорий',
        lastName: 'Ивлев',
        middleName: 'Сергеевич',
        birthDate: '09.08.1998',
        drivingLicense: '7730 348239',
        experienceStartDate: '13.01.2017',
        hasOldLicense: false,
        oldDrivingLicense: '',
        oldLastName: '',
      },
    ],
    insurerOwner: {
      insurerIsOwner: true,
      user: {
        firstName: 'Григорий',
        lastName: 'Ивлев',
        middleName: 'Сергеевич',
        birthDate: '09.08.1998',
        passportNumber: '5416845211',
        passportObtainingDate: '26.09.2018',
        address: {
          source: {
            data: {
              fias_level: '8',
              region: 'Москва',
            },
          },
          value: 'г Москва, ул Академика Виноградова, д 2',
        },
        addressFlat: '94',
      },
    },
    selectedDrivers: [true],
    unlimitedDrivers: false,
    vehicleCategory: 'B',
  } as IClientDataState,
};

export const MAPPED_CLIENT_DATA = {
  А197МВ197: {
    bodyNumber: '',
    modification: undefined,
    brandId: 48,
    carDocument: {
      date: '12.12.2022',
      documentType: 'sts',
      number: '212212',
      series: '1221',
    },
    carNumber: 'А197МВ197',
    chassisNumber: '',
    driversInfo: {
      driverAmount: 'limited',
      drivers: [
        {
          birthDate: '1998-08-09',
          firstName: 'Григорий',
          fullName: 'Ивлев Григорий Сергеевич',
          lastName: 'Ивлев',
          license: {
            date: '2017-01-13',
            number: '348239',
            series: '7730',
          },
          middleName: 'Сергеевич',
          previousInfo: {
            firstName: 'Григорий',
            fullName: 'Ивлев Григорий Сергеевич',
            lastName: '',
            license: {
              number: '',
              series: '',
            },
            middleName: 'Сергеевич',
          },
        },
      ],
    },
    enginePower: 270,
    insurer: {
      address: {
        data: {
          flatNumber: '94',
        },
        formattedAddress: 'г Москва, ул Академика Виноградова, д 2',
        formattedFiasLevel: '8',
      },
      birthDate: '1998-08-09',
      email: '',
      firstName: 'Григорий',
      fullName: 'Ивлев Григорий Сергеевич',
      lastName: 'Ивлев',
      middleName: 'Сергеевич',
      passport: {
        issueDate: '2018-09-26',
        number: '845211',
        series: '5416',
      },
      phone: '',
    },
    modelId: 100052931,
    owner: {
      address: {
        data: {
          flatNumber: '94',
        },
        formattedAddress: 'г Москва, ул Академика Виноградова, д 2',
        formattedFiasLevel: '8',
      },
      birthDate: '1998-08-09',
      firstName: 'Григорий',
      fullName: 'Ивлев Григорий Сергеевич',
      lastName: 'Ивлев',
      middleName: 'Сергеевич',
      passport: {
        issueDate: '2018-09-26',
        number: '845211',
        series: '5416',
      },
    },
    policyStartDate: '15.12.2023',
    vehicleCategory: 'B',
    vin: 'DSDSM211212211212',
    year: 2021,
  },
};

export const EMPTY_CLIENT_DATA = {
  bodyNumber: undefined,
  brandId: undefined,
  carDocument: {
    date: undefined,
    documentType: undefined,
    number: undefined,
    series: undefined,
  },
  carNumber: undefined,
  chassisNumber: undefined,
  driversInfo: {
    driverAmount: 'limited',
    drivers: [],
  },
  enginePower: NaN,
  insurer: {
    address: {
      data: {
        flatNumber: undefined,
      },
      formattedAddress: undefined,
      formattedFiasLevel: '',
    },
    birthDate: undefined,
    email: undefined,
    firstName: undefined,
    fullName: '',
    lastName: undefined,
    middleName: undefined,
    passport: {
      issueDate: undefined,
      number: undefined,
      series: undefined,
    },
    phone: undefined,
  },
  modelId: undefined,
  owner: {
    address: {
      data: {},
      formattedFiasLevel: '',
    },
    birthDate: undefined,
    firstName: undefined,
    fullName: '',
    lastName: undefined,
    middleName: undefined,
    passport: {
      issueDate: undefined,
      number: undefined,
      series: undefined,
    },
  },
  policyStartDate: undefined,
  vehicleCategory: 'B',
  vin: undefined,
  modification: undefined,
  year: NaN,
};
