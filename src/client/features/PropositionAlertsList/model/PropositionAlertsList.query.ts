import type { disableUpSale } from 'commonTypes/api/disableUpSale';
import { BFF_API_ROUTES } from 'constants/apiRoutes';

import { baseRTKApi } from 'shared/api/baseApi';

export const PropositionAlertsQueries = baseRTKApi.injectEndpoints({
  endpoints: (build) => ({
    disableUpSale: build.query<disableUpSale.GetDisableUpSale, string>({
      query: (orderHash) => ({
        url: BFF_API_ROUTES.disableUpSale,
        params: { orderHash },
      }),
    }),
  }),
});

export const useLazyDisableUpSale = PropositionAlertsQueries.useLazyDisableUpSaleQuery;
