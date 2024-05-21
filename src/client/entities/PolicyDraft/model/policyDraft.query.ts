import type { PoliciesDrafts } from 'commonTypes/api/policiesDrafts';
import { BFF_API_ROUTES } from 'constants/apiRoutes';

import { baseRTKApi } from 'shared/api/baseApi';

import { mapPoliciesDrafts } from '../lib/mapPoliciesDrafts';
import type { IPolicyDraftState } from '../types';

export const queries = baseRTKApi.injectEndpoints({
  endpoints: (build) => ({
    // Получение черновиков полисов(может быть доп. черновик для upsale в случае с реником)
    getPoliciesDrafts: build.query<IPolicyDraftState, PoliciesDrafts.BFFRequest>({
      query: (body) => ({
        url: BFF_API_ROUTES.getPoliciesDrafts,
        method: 'POST',
        body,
      }),
      transformResponse: mapPoliciesDrafts,
    }),
  }),
});

export const useGetPoliciesDrafts = queries.useLazyGetPoliciesDraftsQuery;

export const { getPoliciesDrafts } = queries.endpoints;
