import type { PropositionCalculations } from 'commonTypes/api/propositionCalculations';
import { BFF_API_ROUTES } from 'constants/apiRoutes';

import { baseRTKApi } from 'shared/api/baseApi';

import { mapOrderHashResponse } from '../lib/helpers/mapOrderHashResponse';
import type { TGetOrderHash } from '../types';

export const queries = baseRTKApi.injectEndpoints({
  endpoints: (build) => ({
    // создание хеша заказа
    createOrderHash: build.mutation<TGetOrderHash, PropositionCalculations.PostManyOrdersRequest>({
      query: (query) => ({
        url: BFF_API_ROUTES.postManyOrders,
        method: 'POST',
        body: query,
      }),

      transformResponse: (response: PropositionCalculations.PostManyOrders) => mapOrderHashResponse(response),
    }),
  }),
});

export const useLazyCreateOrderHash = queries.useCreateOrderHashMutation;

export const { createOrderHash } = queries.endpoints;
