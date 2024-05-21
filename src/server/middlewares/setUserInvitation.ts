import type { Next } from 'koa';

import { getIdentityUser } from '../services/user/user/userServices';
import { formatQueryParams } from '../utils/formatQueryParams';

export const setUserInvitation = async (ctx: App.ExtendedContext, next: Next): Promise<void> => {
  const userId = formatQueryParams(ctx.request?.query?.aff_sub2);
  const loyaltyProgram = formatQueryParams(ctx.request?.query?.aff_id);

  // показываем имя только если aff_id=3565 https://sravni-corp.slack.com/archives/C04570HMDFZ/p1678351274079569
  if (userId && loyaltyProgram === '3565') {
    const { firstName } = (await getIdentityUser(userId)) || {};

    ctx.req.__LANDING_FRIEND__ = firstName;
  }

  return next();
};
