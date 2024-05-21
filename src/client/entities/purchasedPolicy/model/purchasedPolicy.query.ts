import type { Order } from 'commonTypes/api/orderInfo';
import { BFF_API_ROUTES } from 'constants/apiRoutes';

import { baseRTKApi } from 'shared/api/baseApi';

import { mapPolicyLink } from '../lib';
import { mapPurchasedPolicy } from '../lib/mapPurchasedPolicy';
import type { PolicyInfoResult, PolicyLink } from '../types';

export const queries = baseRTKApi.injectEndpoints({
  endpoints: (build) => ({
    getPurchasedPolicyInfo: build.query<PolicyInfoResult, string | string[]>({
      query: (orderHash) => ({
        url: BFF_API_ROUTES.getPurchasedPolicyInfo,
        params: { orderHash, force: true },
      }),
      transformResponse: (response: Order.GetOrderInfo) => mapPurchasedPolicy(response),
    }),
    getPolicyLink: build.query<PolicyLink, string | string[]>({
      query: (orderHash) => ({
        url: BFF_API_ROUTES.getPolicyLink,
        params: {
          orderHash,
        },
      }),
      transformResponse: mapPolicyLink,
    }),
  }),
});

export const useGetOrderInfo = queries.useLazyGetPurchasedPolicyInfoQuery;
export const useGetPolicyLink = queries.useLazyGetPolicyLinkQuery;
