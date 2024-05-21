import type { PreviousCalculation } from 'commonTypes/api/previousCalculations';
import { BFF_API_ROUTES } from 'constants/apiRoutes';

import { baseRTKApi } from 'shared/api/baseApi';

import { mapPolicies } from '../lib/mapPolicies';
import type { StatePolicies } from '../types';

export const queries = baseRTKApi.injectEndpoints({
  endpoints: (build) => ({
    getPolicies: build.query<StatePolicies, void>({
      query: () => ({
        url: BFF_API_ROUTES.getPolicies,
      }),
      transformResponse: (response: PreviousCalculation.GetProlongationPolicies) => mapPolicies(response),
    }),
  }),
});

export const useLazyGetPolicies = queries.useLazyGetPoliciesQuery;
