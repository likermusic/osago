import { joinFullName } from '@sravni/cosago-react-library/lib/utils';

import type { TGetPersonFullNameParams } from 'shared/lib/getPersonFullName/getPersonFullName';
import { getPersonFullName } from 'shared/lib/getPersonFullName/getPersonFullName';

describe('WHEN "getPersonFullName" is called', () => {
  const data: TGetPersonFullNameParams = {
    firstName: 'Firstname',
    fullName: 'Fullname',
    lastName: 'Lastname',
    middleName: 'Middlename',
  };

  it('AND "fullName" was provided, MUST return "fullName" value', () => {
    expect(getPersonFullName(data)).toEqual(data.fullName);
  });

  it('AND "fullName" was not provided, MUST return compose name from first, last, middle name value', () => {
    expect(getPersonFullName({ ...data, fullName: '' })).toEqual(
      joinFullName(data.lastName!, data.firstName!, data.middleName!),
    );
  });
});
