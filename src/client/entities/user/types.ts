import type { IPublicUser } from '@sravni/types/lib/auth';

export type StateUser = {
  account?: IPublicUser & { isHasEsia?: boolean };
  isLoggedIn: boolean;
  restoredAccount: Nullable<{
    sub: Nullable<string>;
    phone_number: Nullable<string>;
  }>;
  esiaErrorCount: number;
  esiaStep?: string;
};
