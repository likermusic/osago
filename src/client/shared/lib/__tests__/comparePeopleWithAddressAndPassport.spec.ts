import { comparePeopleWithAddressAndPassport } from '../comparePeopleWithAddressAndPassport';

describe('WHEN "comparePeopleWithAddressAndPassport" is called', () => {
  it('AND equal person are provided MUST return true', () => {
    const person1 = {
      fullName: {
        label: 'Туркова Екатерина Константиновна',
        value: 'Туркова Екатерина Константиновна',
      },
      birthday: '15.04.1981',
      passportNumber: '4520 123456',
      passportIssueDate: '08.09.2020',
      registrationAddress: {
        label: 'г Москва, ш Богородское, д 18 стр 11',
        value: 'г Москва, ш Богородское, д 18 стр 11',
      },
      registrationAddressFlat: '3',
    };
    const person2 = JSON.parse(JSON.stringify(person1));
    expect(comparePeopleWithAddressAndPassport(person1, person2)).toBeTruthy();
  });
});
