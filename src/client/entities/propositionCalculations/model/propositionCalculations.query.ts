import type { PropositionCalculations } from 'commonTypes/api/propositionCalculations';
import { BFF_API_ROUTES } from 'constants/apiRoutes';

import { baseRTKApi } from 'shared/api/baseApi';

import { mapCalculationHashResponse } from '../lib/helpers/mapCalculationHashResponse';
import type { ITransformedGetCalculationHash } from '../types';

export const queries = baseRTKApi.injectEndpoints({
  endpoints: (build) => ({
    // создание хеша расчета
    getCalculationsHash: build.query<
      ITransformedGetCalculationHash,
      PropositionCalculations.GetCalculationsHashRequest
    >({
      query: (body) => ({
        url: BFF_API_ROUTES.getCalculationsHash,
        body,
        method: 'POST',
      }),

      transformResponse: (response: PropositionCalculations.GetCalculationsHashResponse) =>
        mapCalculationHashResponse(response),
    }),
  }),
});

export const useLazyGetCalculationsHash = queries.useLazyGetCalculationsHashQuery;

export const { getCalculationsHash } = queries.endpoints;
