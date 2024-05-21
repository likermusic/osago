import type { Raffle } from 'commonTypes/api/raffle';

import { config } from '../../constants/config';
import { requestWithoutTokenPost } from '../../utils/api/api';
import type { AuthorizationHeader } from '../../utils/getUserToken';

export const registerUserInRaffleRequest = async (
  body: Raffle.RegisterUserInRaffleRequest,
  authHeader: AuthorizationHeader,
) => {
  const { data } = await requestWithoutTokenPost(`${config.PROMO}/v1/lottery/register`, body, { headers: authHeader });

  return data;
};
