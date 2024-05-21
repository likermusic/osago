import { mapUser, mapUserWithPassport } from '../mapUser';

const BASIC_USER = {
  birthday: '05.01.1999',
  fullName: { label: 'Шестаков Андрей Романович', value: 'Шестаков Андрей Романович' },
};

const BASIC_USER_NORMALIZED = {
  birthDate: '1999-01-05',
  firstName: 'Андрей',
  lastName: 'Шестаков',
  middleName: 'Романович',
};

describe('WHEN "mapUser" is called', () => {
  it('MUST normalize user', () => {
    expect(mapUser(BASIC_USER)).toEqual(BASIC_USER_NORMALIZED);
  });
  it('AND no birthdate is provided MUST NOT return Invalid date', () => {
    expect(mapUser({ ...BASIC_USER, birthday: '' })).toEqual({ ...BASIC_USER_NORMALIZED, birthDate: undefined });
  });
});

describe('WHEN "mapUserWithPassport" is called', () => {
  it('MUST normalize user with passport', () => {
    expect(
      mapUserWithPassport({ ...BASIC_USER, passportNumber: '1234567890', passportIssueDate: '01.01.2020' }),
    ).toEqual({ ...BASIC_USER_NORMALIZED, passport: { series: '1234', number: '567890', issueDate: '2020-01-01' } });
  });
  it('AND no passport issue date is provided MUST NOT return Invalid date', () => {
    expect(mapUserWithPassport({ ...BASIC_USER, passportNumber: '', passportIssueDate: '' })).toEqual({
      ...BASIC_USER_NORMALIZED,
      passport: { series: '', number: '', issueDate: undefined },
    });
  });
});
