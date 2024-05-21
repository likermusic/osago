import type { PolicyInfo } from 'commonTypes/api/policyInfo';
import { BFF_API_ROUTES } from 'constants/apiRoutes';

import { baseRTKApi } from 'shared/api/baseApi';

import { mapPolicyInfo } from '../lib/mapPolicyInfo';
import type { IPolicyInfoRequest } from '../lib/mapPolicyInfoRequest';
import { mapPolicyInfoRequest } from '../lib/mapPolicyInfoRequest';
import type { IPolicyInfo } from '../types';

export const queries = baseRTKApi.injectEndpoints({
  endpoints: (build) => ({
    // Получение рекомендованной даты и инфы о полисе
    getPolicyInfo: build.query<IPolicyInfo, IPolicyInfoRequest>({
      query: (body) => ({
        url: BFF_API_ROUTES.getRecommendedStartDate,
        method: 'POST',
        body: mapPolicyInfoRequest(body),
      }),
      transformResponse: (data: PolicyInfo.GetRecommendedStartDateRes) => mapPolicyInfo(data),
    }),
  }),
});

export const useLazyGetPolicyInfo = queries.useLazyGetPolicyInfoQuery;
