import { BFF_API_ROUTES } from 'constants/apiRoutes';

import { baseRTKApi } from 'shared/api/baseApi';

import type { RegAutoNumber } from '../types';

export const queries = baseRTKApi.injectEndpoints({
  endpoints: (build) => ({
    getAutoNumberToken: build.query<RegAutoNumber, string>({
      query: (regNumber) => ({
        url: BFF_API_ROUTES.getRegNumberToken,
        params: { regNumber },
      }),
    }),
  }),
});

export const useGetAutoNumberToken = queries.useLazyGetAutoNumberTokenQuery;
