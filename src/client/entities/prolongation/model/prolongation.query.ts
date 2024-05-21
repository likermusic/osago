import type { Prolongation } from 'commonTypes/api/prolongation';
import { BFF_API_ROUTES } from 'constants/apiRoutes';

import { baseRTKApi } from 'shared/api/baseApi';

import type { TFoundedProlongationPolicy } from '../types';

export const queries = baseRTKApi.injectEndpoints({
  endpoints: (build) => ({
    findProlongationByCarNumber: build.query<TFoundedProlongationPolicy, Prolongation.FoundedProlongationPolicyRequest>(
      {
        query: ({ carNumber }) => ({
          url: BFF_API_ROUTES.findProlongationByCarNumber,
          method: 'POST',
          body: {
            carNumber,
          },
        }),
        transformResponse: (response: Prolongation.FoundedProlongationPolicyResponse) => ({
          prolongationPolicyByCarNumber: response || {},
        }),
      },
    ),
  }),
});

export const useGetPreviousCalculations = queries.useLazyFindProlongationByCarNumberQuery;
