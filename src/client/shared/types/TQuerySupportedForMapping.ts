import type { Query } from 'commonTypes/api/query';
import type { TFrontQuery } from 'commonTypes/TFrontQuery';

export type TQuerySupportedForMapping = Query.TRestoreCalculationQueryResponse | TFrontQuery;

export type TDriverForMapping = {
  fullName?: Nullable<string>;
  firstName?: Nullable<string>;
  lastName?: Nullable<string>;
  middleName?: Nullable<string>;
  birthDate?: string;

  license?: { date?: string; number?: Nullable<string>; series?: Nullable<string> };

  previousInfo?: {
    lastName?: Nullable<string>;
    firstName?: Nullable<string>;
    license?: { number?: Nullable<string>; series?: Nullable<string> };
    fullName?: Nullable<string>;
    middleName?: Nullable<string>;
  };
};

export type TUserForMapping = {
  lastName?: Nullable<string>;
  middleName?: Nullable<string>;
  firstName?: Nullable<string>;
  fullName?: Nullable<string>;
  passport?: {
    series?: Nullable<string>;
    number?: Nullable<string>;
    issueDate?: Nullable<string>;
  };
  address?: {
    data?: {
      flatNumber?: Nullable<string>;
    };
    formattedAddress?: Nullable<string>;
    formattedFiasLevel?: Nullable<string>;
  };
  birthDate?: string;
  registrationAddress?: string;
  registrationAddressFlat?: string;
};
