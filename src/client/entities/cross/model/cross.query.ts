import type { Cross } from 'commonTypes/api/cross';
import { BFF_API_ROUTES } from 'constants/apiRoutes';

import { baseRTKApi } from 'shared/api/baseApi';
import { sendEventCrossShow } from 'shared/lib/sendGAEvents';
import { CrossStatusesType } from 'shared/lib/sendGAEvents/events';

import { mapCrossCalculations } from '../lib/mapCrossCalculations';
import type { ICrossCalculationsResult, ICrossOrders } from '../types';

import { crossSlice } from './cross.slice';

export const queries = baseRTKApi.injectEndpoints({
  endpoints: (build) => ({
    getCrossCalculations: build.query<ICrossCalculationsResult, string | string[]>({
      query: (crossHash) => ({
        url: BFF_API_ROUTES.getCrossCalculations,
        params: { crossHash },
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (_e) {
          dispatch(crossSlice.actions.setErrorCalculationStatus());
          sendEventCrossShow(CrossStatusesType.ServiceIsUnavailable);
        }
      },
      transformResponse: (response: Cross.GetCrossCalculations) => mapCrossCalculations(response),
    }),
    postCrossCalculations: build.mutation<ICrossCalculationsResult, string | string[]>({
      query: (orderHash) => ({
        url: BFF_API_ROUTES.postCrossCalculations,
        method: 'POST',
        body: { orderHash },
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (_e) {
          dispatch(crossSlice.actions.setErrorCalculationStatus());
        }
      },
    }),
    getCrossOrders: build.query<ICrossOrders, string>({
      query: (hash) => ({
        url: BFF_API_ROUTES.getCrossOrders,
        params: { hash },
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (_e) {
          dispatch(crossSlice.actions.setErrorOrdersStatus());
        }
      },
    }),
    postCrossOrders: build.mutation<ICrossOrders, string>({
      query: (propositionHash) => ({
        url: BFF_API_ROUTES.postCrossOrders,
        method: 'POST',
        body: { propositionHash },
      }),
    }),
  }),
});

export const usePostCrossCalculations = queries.usePostCrossCalculationsMutation;
export const useGetCrossCalculations = queries.useLazyGetCrossCalculationsQuery;
export const usePostCrossOrders = queries.usePostCrossOrdersMutation;
export const useGetCrossOrders = queries.useLazyGetCrossOrdersQuery;
