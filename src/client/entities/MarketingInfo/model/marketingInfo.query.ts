import type { Marketing } from 'commonTypes/api/marketing';
import { BFF_API_ROUTES } from 'constants/apiRoutes';

import { baseRTKApi } from 'shared/api/baseApi';

import { mapMarketingInfoResponse } from '../lib/mapMarketingInfoResponse';
import { DEFAULT_MARKETING_INFO } from '../lib/marketingInfo.constants';
import type { TMarketingInfo } from '../types';

export const queries = baseRTKApi.injectEndpoints({
  endpoints: (build) => ({
    getMarketingInfo: build.query<TMarketingInfo, void>({
      query: () => ({
        url: BFF_API_ROUTES.getMarketingInfo,
      }),
      transformResponse: (response: Marketing.GetMarketingInfoResponse) => mapMarketingInfoResponse(response),
      transformErrorResponse: () => DEFAULT_MARKETING_INFO,
    }),
  }),
});

export const useGetMarketingInfo = queries.useGetMarketingInfoQuery;
