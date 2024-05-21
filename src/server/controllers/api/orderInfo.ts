import { getOrderInfoRequest, postPolicyLinkRequest } from '../../services/orderInfo';

export const getOrderInfo = async (ctx: App.ExtendedContext) => {
  const { orderHash, force } = ctx.query;

  ctx.body = await getOrderInfoRequest(orderHash, force);
};

export const postPolicyLink = async (ctx: App.ExtendedContext) => {
  const { orderHash } = ctx.query;

  ctx.body = await postPolicyLinkRequest(orderHash);
};
