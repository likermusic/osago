import type { Raffle } from 'commonTypes/api/raffle';

import { getPoliciesForRaffleRequest } from '../../services/raffle/getPoliciesForRaffleRequest';
import { registerUserInRaffleRequest } from '../../services/raffle/registerUserInRaffleRequest';
import { getUserToken } from '../../utils/getUserToken';

export const getPoliciesForRaffle = async (ctx: App.ExtendedContext) => {
  const { lotteryName } = ctx.request.query;
  const headers = getUserToken(ctx);
  ctx.body = await getPoliciesForRaffleRequest(lotteryName, headers);
};

export const registerUserInRaffle = async (ctx: App.ExtendedContext) => {
  const body = ctx.request.body as Raffle.RegisterUserInRaffleRequest;
  const headers = getUserToken(ctx);

  ctx.body = await registerUserInRaffleRequest(body, headers);
};
