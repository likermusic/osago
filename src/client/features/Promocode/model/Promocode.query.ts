import type { Promocode } from 'commonTypes/api/promocode';
import { BFF_API_ROUTES } from 'constants/apiRoutes';

import { baseRTKApi } from 'shared/api/baseApi';

export const queries = baseRTKApi.injectEndpoints({
  endpoints: (build) => ({
    checkPromo: build.query<Promocode.CheckPromoResponse, string>({
      query: (promocode) => ({
        url: BFF_API_ROUTES.checkPromo,
        body: { promocode },
        method: 'POST',
      }),
      transformErrorResponse: () => ({
        promoCode: '',
        isActive: false,
        error: 'Ошибка интернет-соединения',
      }),
    }),
  }),
});

export const useLazyCheckPromo = queries.useLazyCheckPromoQuery;
