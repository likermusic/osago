import type { Next } from 'koa';

import { BENEFIT_CODES } from './constants';

export const setPromosMiddleware = async (ctx: App.ExtendedContext, next: Next) => {
  if (ctx.path.startsWith('/osago/dodo')) {
    ctx.req.__BENEFIT_CODE__ = BENEFIT_CODES.dodo;
    return next();
  }

  await next();
};
