import type { Raffle } from 'commonTypes/api/raffle';

import { config } from '../../constants/config';
import { requestWithoutTokenGet } from '../../utils/api/api';
import type { AuthorizationHeader } from '../../utils/getUserToken';

export const getPoliciesForRaffleRequest = async (lotteryName: string, authHeader: AuthorizationHeader) => {
  const { data } = await requestWithoutTokenGet<Raffle.GetPoliciesForRaffleResponse>(
    `${config.PROMO}/v1/lottery/policies?LotteryName=${lotteryName}`,
    {
      headers: authHeader,
    },
  );

  return data;
};
