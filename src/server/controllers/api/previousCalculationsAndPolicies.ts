import { getPreviousCalculations, getPreviousPolicies } from '../../services/previousCalculations';
import { getUserToken } from '../../utils/getUserToken';

export const getPreviousCalculationsController = async (ctx: App.ExtendedContext) => {
  const userToken = getUserToken(ctx);
  ctx.body = await getPreviousCalculations(userToken);
};

export const getPreviousPoliciesController = async (ctx: App.ExtendedContext) => {
  const userToken = getUserToken(ctx);
  ctx.body = await getPreviousPolicies(userToken);
};
