import { BFF_API_ROUTES } from 'constants/apiRoutes';

import { baseRTKApi } from 'shared/api/baseApi';

import type { IMappedSelectedPropositionInfo } from 'entities/selectedProposition';

import { mapSelectedPropositionInfo } from '../lib/mapSelectedPropositionInfo';

export const queries = baseRTKApi.injectEndpoints({
  endpoints: (build) => ({
    // Восстанавливаем цену через эту ручку на странице summary
    restoreSelectedPropositionInfo: build.query<Nullable<IMappedSelectedPropositionInfo>, string>({
      query: (orderHash) => ({
        url: BFF_API_ROUTES.restoreSelectedPropositionInfo,
        method: 'GET',
        params: { orderHash },
      }),
      transformResponse: mapSelectedPropositionInfo,
    }),
  }),
});

export const useRestoreSelectedPropositionInfo = queries.useLazyRestoreSelectedPropositionInfoQuery;

export const { restoreSelectedPropositionInfo } = queries.endpoints;
