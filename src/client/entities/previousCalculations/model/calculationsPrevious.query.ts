import type { PreviousCalculation } from 'commonTypes/api/previousCalculations';
import { BFF_API_ROUTES } from 'constants/apiRoutes';

import { baseRTKApi } from 'shared/api/baseApi';

import { mapCalculations } from 'entities/previousCalculations/lib/mapPreviousCalculation';

import type { previousCalculationsState } from '../types';

export const queries = baseRTKApi.injectEndpoints({
  endpoints: (build) => ({
    getPreviousCalculations: build.query<previousCalculationsState, void>({
      query: () => ({
        url: BFF_API_ROUTES.getPreviousCalculations,
      }),
      transformResponse: (response: PreviousCalculation.GetCalculations): previousCalculationsState =>
        mapCalculations(response),
    }),
  }),
});

export const useLazyGetPreviousCalculations = queries.useLazyGetPreviousCalculationsQuery;
