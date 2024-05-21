import { getRecommendedStartDate } from '../../services/policyInfo';

export const getRecommendedStartDateController = async (ctx: App.ExtendedContext) => {
  const req = ctx.request.body;

  ctx.body = await getRecommendedStartDate(req);
};
