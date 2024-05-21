import type { ICustomSelectValue } from '@sravni/cosago-react-library/lib/types';

type TData = {
  fias_level?: string;
  region?: string;
};

export type UserCommonFields = {
  fullName: Nullable<ICustomSelectValue>;
  birthday: string;
  passportNumber: string;
  passportIssueDate: string;
  registrationAddress: Nullable<ICustomSelectValue<TData>>;
  registrationAddressFlat: string;
};
