import type { TPerson } from 'entities/people';

export const PERSON_WITH_ONLY_DRIVER_DATA_1: TPerson = {
  fullName: 'Иванов Иван Иванович',
  licenceNumber: '1234312324',
  birthday: '12.12.1960',
  experienceStartDate: '12.12.2022',
  hasPreviousLicence: false,
};

export const PERSON_WITH_FULL_DATA_1: TPerson = {
  address: {
    value: 'г Москва, ул Профсоюзная, д 25А',
    source: {
      data: {
        fias_level: '8',
        region: 'Москва',
      },
    },
  },
  birthday: '11.11.1970',
  experienceStartDate: '12.12.2022',
  fullName: 'Серегей Сергей Сергеевич',
  licenceNumber: '1221212121',
  passportNumber: '2121122121',
  passportIssueDate: '12.12.2022',
  addressFlat: '10',
};

export const PERSON_WITH_FULL_DATA_2: TPerson = {
  address: {
    value: 'г Москва, пр-кт Мещерский, д 1/15',
    source: {
      data: {
        fias_level: '8',
        region: 'Москва',
      },
    },
  },
  addressFlat: '42',
  birthday: '10.10.1988',
  fullName: 'Пугало Ирина Васильевна',
  hasPreviousLicence: false,
  passportNumber: '1111111111',
  passportIssueDate: '10.10.2012',
};
