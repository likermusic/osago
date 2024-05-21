import { clearCacheRequest } from '../../services/clearCache/clearCache';

export const clearCache = async (ctx: App.ExtendedContext) => {
  const { orderHash } = ctx.request.body;

  ctx.body = await clearCacheRequest(orderHash);
};
