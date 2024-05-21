import type { Context } from 'koa';

export const getCookie = (ctx: { cookies: { get: Context['cookies']['get'] } }) => (cookieName: string) =>
  ctx.cookies.get(cookieName) ?? '';
