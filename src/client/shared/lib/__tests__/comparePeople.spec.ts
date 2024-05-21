import { comparePeopleWithFullNameAsObject } from '../comparePeopleWithFullNameAsObject';

describe('WHEN "comparePeople" is called', () => {
  it('AND equal person are provided MUST return true', () => {
    const person1 = {
      fullName: {
        label: 'Туркова Екатерина Константиновна',
        value: 'Туркова Екатерина Константиновна',
      },
      birthday: '15.04.1981',
    };
    const person2 = JSON.parse(JSON.stringify(person1));
    expect(comparePeopleWithFullNameAsObject(person1, person2)).toBeTruthy();
  });

  it('AND no person are provided MUST return false', () => {
    // @ts-ignore
    expect(comparePeopleWithFullNameAsObject(undefined, undefined)).toBeFalsy();
  });

  it('AND one person is not provided MUST return false', () => {
    const person1 = {
      fullName: {
        label: 'Туркова Екатерина Константиновна',
        value: 'Туркова Екатерина Константиновна',
      },
      birthday: '15.04.1981',
    };

    // @ts-ignore
    expect(comparePeopleWithFullNameAsObject(person1, undefined)).toBeFalsy();
  });

  it('AND fullName is not provided MUST return false', () => {
    const person1 = {
      fullName: {
        label: undefined,
        value: undefined,
      },
      birthday: '15.04.1981',
    };

    // @ts-ignore
    expect(comparePeopleWithFullNameAsObject(person1, person1)).toBeFalsy();
  });

  it('AND one person is not fully provided MUST return false', () => {
    const person1 = {
      fullName: {
        label: 'Туркова Екатерина Константиновна',
        value: 'Туркова Екатерина Константиновна',
      },
      birthday: '15.04.1981',
    };

    // @ts-ignore
    expect(comparePeopleWithFullNameAsObject(person1, { ...person1, birthday: undefined })).toBeFalsy();
  });

  it('AND person is not the same MUST return false', () => {
    const person1 = {
      fullName: {
        label: 'Туркова Екатерина Константиновна',
        value: 'Туркова Екатерина Константиновна',
      },
      birthday: '15.04.1981',
    };

    const person2 = {
      fullName: {
        label: 'Ивлева Екатерина Константиновна',
        value: 'Ивлева Екатерина Константиновна',
      },
      birthday: '22.05.1985',
    };

    // @ts-ignore
    expect(comparePeopleWithFullNameAsObject(person1, person2)).toBeFalsy();
  });

  it('AND case is not the same but person is the same MUST return true', () => {
    const person1 = {
      fullName: {
        label: 'Туркова Екатерина Константиновна',
        value: 'Туркова Екатерина Константиновна',
      },
      birthday: '15.04.1981',
    };
    const person2 = {
      fullName: {
        label: 'ТУРКОВА ЕКАТЕРИНА КОНСТАНТИНОВНА',
        value: 'ТУРКОВА ЕКАТЕРИНА КОНСТАНТИНОВНА',
      },
      birthday: '15.04.1981',
    };
    expect(comparePeopleWithFullNameAsObject(person1, person2)).toBeTruthy();
  });
});
