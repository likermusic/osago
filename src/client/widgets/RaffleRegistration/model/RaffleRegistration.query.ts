import type { Raffle } from 'commonTypes/api/raffle';
import { BFF_API_ROUTES } from 'constants/apiRoutes';

import { baseRTKApi } from 'shared/api/baseApi';

import { mapGetPoliciesForRaffle } from '../lib/mapGetPoliciesForRaffle';
import type { TGetPoliciesForRaffleResponse } from '../types';

export const queries = baseRTKApi.injectEndpoints({
  endpoints: (build) => ({
    getPoliciesForRaffle: build.query<TGetPoliciesForRaffleResponse, string>({
      query: (lotteryName) => ({
        url: BFF_API_ROUTES.getPoliciesForRaffle,
        params: { lotteryName },
      }),
      transformResponse: mapGetPoliciesForRaffle,
      extraOptions: {
        // На всякий случай, тк делаем это после авторизации, поэтому можем иногда отваливаться
        maxRetries: 5,
      },
    }),
    registerUserInRaffle: build.query<Raffle.RegisterUserInRaffleResponse, Raffle.RegisterUserInRaffleRequest>({
      query: (body) => ({
        url: BFF_API_ROUTES.registerUserInRaffle,
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const useLazyGetPoliciesForRaffle = queries.useLazyGetPoliciesForRaffleQuery;
export const useLazyRegisterUserInRaffle = queries.useLazyRegisterUserInRaffleQuery;

export const { getPoliciesForRaffle, registerUserInRaffle } = queries.endpoints;
