import type { OSAGOGATEWAY_API } from '../../generatedDTO';

export declare namespace User {
  export type PostAssignUserId =
    OSAGOGATEWAY_API['/v1/orders/assignUserId']['post']['responses']['200']['content']['application/json'];
  export type PostAssignUserIdPostParams =
    OSAGOGATEWAY_API['/v1/orders/assignUserId']['post']['requestBody']['content']['application/json'];

  type Gender = 'Male' | 'Female';

  type SubscriptionType = 'CommentsNotifications' | 'OrdersNotifications' | 'News' | 'Targeted';

  type SubscriptionInfo = {
    types: SubscriptionType[];
    source: string;
    date: string;
  };

  export type UserModel = {
    id: number;
    username?: string;
    registerDate: string;
    pseudonym?: string;
    firstName?: string;
    lastName?: string;
    birthDate?: string;
    companyId?: number;
    gender?: Gender;
    locality: ?string;
    localityRoute?: string;
    otac: string;
    phone: string;
    email?: string;
    unconfirmedEmail?: string;
    subscriptions?: SubscriptionInfo;
    emailConfirmationToken?: string;
    hasPassword: boolean;
    externalProviders?: ['Esia'];
  };
}
