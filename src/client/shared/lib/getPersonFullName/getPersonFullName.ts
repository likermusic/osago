import { joinFullName } from '@sravni/cosago-react-library/lib/utils';

import { capitalizeFullName } from '../formatters';

export type TGetPersonFullNameParams = {
  fullName: Nullable<string>;
  firstName: Nullable<string>;
  lastName: Nullable<string>;
  middleName: Nullable<string>;
};

export const getPersonFullName = (options?: Partial<TGetPersonFullNameParams> | null) => {
  const { firstName, middleName, lastName, fullName } = options || {};

  return capitalizeFullName(fullName || joinFullName(lastName ?? '', firstName ?? '', middleName ?? '')).trim();
};
