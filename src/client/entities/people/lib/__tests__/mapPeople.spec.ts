import type { Profile } from 'commonTypes/api/profile';

import type { TPerson } from 'entities/people';

import { mapPeople } from '../mapPeople';

describe('WHEN "mapPeople" is called ', () => {
  const BASE_PERSON = {
    birthDate: '1999-01-05T00:00:00',
    email: 'test@sravni.ru',
    firstName: 'Иван',
    fullName: 'Иванов Иван Иванович',
    lastName: 'Иванов',
    middleName: 'Иванович',
    namesake: true,
    phone: '79272123456',
    roles: ['owner', 'driver'],
    fromEsia: false,
  };

  const NORMALIZED_BASE_PERSON: TPerson = {
    address: {
      value: undefined,
      source: undefined,
    },
    email: 'test@sravni.ru',
    addressFlat: undefined,
    birthday: '05.01.1999',
    fullName: 'Иванов Иван Иванович',
    experienceStartDate: undefined,
    hasPreviousLicence: false,
    licenceNumber: undefined,
    passportNumber: undefined,
    passportIssueDate: undefined,
    fromEsia: false,
    phone: '79272123456',
  };

  it('MUST normalize base person', () => {
    const PERSONE_WITH_ESIA = {
      ...BASE_PERSON,
      firstName: 'Госуслугов',
      fullName: 'Госуслугов Госуслуг Госуслугович',
      lastName: 'Госуслуг',
      middleName: 'Госуслугович',
      fromEsia: true,
    };

    const NORMALIZED_BASE_PERSON_WITH_ESIA = {
      ...NORMALIZED_BASE_PERSON,
      fullName: 'Госуслугов Госуслуг Госуслугович',
      fromEsia: true,
    };

    const fakeResponse = { people: [BASE_PERSON, PERSONE_WITH_ESIA] };
    const expected = [NORMALIZED_BASE_PERSON_WITH_ESIA, NORMALIZED_BASE_PERSON];
    expect(mapPeople(fakeResponse)).toEqual(expected);
  });

  it('MUST sort person fromEsia = true at first', () => {
    const fakeResponse = { people: [BASE_PERSON] };
    const expected = [NORMALIZED_BASE_PERSON];
    expect(mapPeople(fakeResponse)).toEqual(expected);
  });

  it('AND address and passport are provided MUST normalize person', () => {
    const fakeResponse: Profile.PostPeopleResponse = {
      people: [
        {
          ...BASE_PERSON,
          address: {
            data: {
              flatNumber: '1',
              region: 'Самарская',
            },
            formattedAddress: 'Самарская обл, г Тольятти, ул Фрунзе, д 8Б',
            formattedFiasLevel: '8',
          },
          passport: {
            number: '4520123456',
            obtainingDate: '2019-03-12T00:00:00',
          },
        },
      ],
    };

    const expected: TPerson[] = [
      {
        ...NORMALIZED_BASE_PERSON,
        address: {
          value: 'Самарская обл, г Тольятти, ул Фрунзе, д 8Б',
          source: {
            data: {
              fias_level: '8',
              region: 'Самарская',
            },
          },
        },
        addressFlat: '1',
        passportNumber: '4520123456',
        passportIssueDate: '12.03.2019',
      },
    ];
    expect(mapPeople(fakeResponse)).toEqual(expected);
  });

  it('AND driver license is provided MUST normalize base person', () => {
    const fakeResponse: Profile.PostPeopleResponse = {
      people: [
        {
          ...BASE_PERSON,
          license: {
            experienceStartDate: '2017-03-21T00:00:00',
            experienceStartYear: 2017,
            number: '1234567890',
          },
        },
      ],
    };
    const expected: TPerson[] = [
      {
        ...NORMALIZED_BASE_PERSON,
        experienceStartDate: '21.03.2017',
        licenceNumber: '1234567890',
      },
    ];
    expect(mapPeople(fakeResponse)).toEqual(expected);
  });

  it('AND all info is provided MUST normalize base person', () => {
    const fakeResponse: Profile.PostPeopleResponse = {
      people: [
        {
          ...BASE_PERSON,
          address: {
            data: {
              flatNumber: '1',
              region: 'Самарская',
            },
            formattedAddress: 'Самарская обл, г Тольятти, ул Фрунзе, д 8Б',
            formattedFiasLevel: '8',
          },
          license: {
            experienceStartDate: '2017-03-21T00:00:00',
            experienceStartYear: 2017,
            number: '1234567890',
          },
          passport: {
            number: '4520123456',
            obtainingDate: '2019-03-12T00:00:00',
          },
        },
      ],
    };
    const expected: TPerson[] = [
      {
        ...NORMALIZED_BASE_PERSON,
        address: {
          value: 'Самарская обл, г Тольятти, ул Фрунзе, д 8Б',
          source: {
            data: {
              fias_level: '8',
              region: 'Самарская',
            },
          },
        },
        addressFlat: '1',
        experienceStartDate: '21.03.2017',
        licenceNumber: '1234567890',
        passportNumber: '4520123456',
        passportIssueDate: '12.03.2019',
      },
    ];
    expect(mapPeople(fakeResponse)).toEqual(expected);
  });
});
