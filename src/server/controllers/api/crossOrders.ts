import { getCrossOrders, postCrossOrders } from '../../services/cross';
import { getCookie, readUTMCookie } from '../../utils/analytics';

export const getCrossOrdersController = async (ctx: App.ExtendedContext) => {
  const { hash } = ctx.query;
  ctx.body = await getCrossOrders(hash);
};

export const postCrossOrdersController = async (ctx: App.ExtendedContext) => {
  const { propositionHash } = ctx.request.body;

  ctx.body = await postCrossOrders({ propositionHash, utm: readUTMCookie(getCookie(ctx)) });
};
