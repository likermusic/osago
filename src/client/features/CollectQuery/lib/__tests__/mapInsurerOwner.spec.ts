import { FLAT_PREFIX_IN_FULL_ADDRESS_WITH_DOT } from 'constants/flatPrefix';

import { mapInsurerOwner } from '../mapInsurerOwner';

describe('WHEN "mapInsurerOwner" is called', () => {
  const CONTACTS = {
    email: '123@mail.ru',
    mobilePhone: '79999999999',
  };

  const CONTACTS_NORMALIZED = {
    email: '123@mail.ru',
    phone: '79999999999',
  };

  const USER = {
    birthday: '05.01.1999',
    fullName: { label: 'Шестаков Андрей Романович', value: 'Шестаков Андрей Романович' },
    passportIssueDate: '01.01.2020',
    passportNumber: '1234567890',
    registrationAddress: {
      data: {
        fias_level: '8',
        region: 'Москва',
      },
      label: 'г Москва, ш Богородское, д 18 стр 11',
      value: 'г Москва, ш Богородское, д 18 стр 11',
    },
    registrationAddressFlat: '',
  };

  const USER_NORMALIZED = {
    birthDate: '1999-01-05',
    firstName: 'Андрей',
    lastName: 'Шестаков',
    middleName: 'Романович',
    passport: { series: '1234', number: '567890', issueDate: '2020-01-01' },
    registrationAddress: 'г Москва, ш Богородское, д 18 стр 11',
    formattedFiasLevel: '8',
  };

  it('AND with contacts MUST normalize with contacts', () => {
    const inputUser = USER;
    const expected = { ...USER_NORMALIZED, ...CONTACTS_NORMALIZED };
    expect(mapInsurerOwner(inputUser, CONTACTS, true)).toEqual(expected);
  });

  it('AND with contacts AND with flat MUST normalize with contacts and flat', () => {
    const inputUser = { ...USER, registrationAddressFlat: '1' };
    const expected = {
      ...USER_NORMALIZED,
      registrationAddress: `г Москва, ш Богородское, д 18 стр 11, ${FLAT_PREFIX_IN_FULL_ADDRESS_WITH_DOT}1`,
      ...CONTACTS_NORMALIZED,
    };
    expect(mapInsurerOwner(inputUser, CONTACTS, true)).toEqual(expected);
  });

  it('AND without contacts MUST normalize without contacts', () => {
    const inputUser = USER;
    const expected = USER_NORMALIZED;
    expect(mapInsurerOwner(inputUser, CONTACTS, false)).toEqual(expected);
  });

  it('AND without contacts AND with flat MUST normalize without contacts and with flat', () => {
    const inputUser = { ...USER, registrationAddressFlat: '1' };
    const expected = {
      ...USER_NORMALIZED,
      registrationAddress: `г Москва, ш Богородское, д 18 стр 11, ${FLAT_PREFIX_IN_FULL_ADDRESS_WITH_DOT}1`,
    };
    expect(mapInsurerOwner(inputUser, CONTACTS, false)).toEqual(expected);
  });
});
