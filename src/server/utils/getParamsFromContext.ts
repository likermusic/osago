import type Koa from 'koa';

export function getParamsFromKoaContext<T extends Record<string, unknown>>(ctx: Koa.Context): T {
  return ctx.request.query as T;
}

export function getBodyFromKoaContext<T extends Record<string, unknown>>(ctx: Koa.Context): T {
  return ctx?.request?.body;
}
