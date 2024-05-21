import { disableUpSaleRequest } from '../../services/disableUpSale';

export const disableUpSale = async (ctx: App.ExtendedContext) => {
  const { orderHash } = ctx.query;
  ctx.body = await disableUpSaleRequest(orderHash);
};
