import { getCrossCalculations, postCrossCalculations } from '../../services/cross';

export const getCrossCalculationsController = async (ctx: App.ExtendedContext) => {
  const { crossHash } = ctx.query;

  ctx.body = await getCrossCalculations(crossHash);
};

export const postCrossCalculationsController = async (ctx: App.ExtendedContext) => {
  const { orderHash } = ctx.request.body;

  ctx.body = await postCrossCalculations(orderHash);
};
