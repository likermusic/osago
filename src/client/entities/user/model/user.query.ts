import { BFF_API_ROUTES } from 'constants/apiRoutes';

import { baseRTKApi } from 'shared/api/baseApi';

import type { StateUser } from '../types';

export const queries = baseRTKApi.injectEndpoints({
  endpoints: (build) => ({
    getUserInfo: build.query<StateUser['account'], void>({
      query: () => ({
        url: BFF_API_ROUTES.account,
      }),
    }),
    postAssignUserId: build.query<boolean, { orderHash?: string | string[]; userId?: number | undefined }>({
      query: (body) => ({
        url: BFF_API_ROUTES.postAssignUserId,
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const getUserInfo = queries.useLazyGetUserInfoQuery;
export const useAssignUserId = queries.useLazyPostAssignUserIdQuery;
