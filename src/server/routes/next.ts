import Router from '@koa/router';
import { combineRouters } from '@sravni/koa-utils/lib/utils/routes';
import type { DefaultState, Middleware } from 'koa';

export interface INextRouterOptions {
  prefix?: string;
}

export default function nextRoutes(options: INextRouterOptions): Middleware {
  const { prefix } = options;
  const router = new Router<DefaultState, App.ExtendedContext>({ prefix });

  router.all('/_next/(.*)', async (ctx: App.ExtendedContext) => {
    ctx.respond = false;

    await ctx.handleNext();
  });

  // @ts-ignore Не могу разобраться почему он ругается, пока закоментировал
  return combineRouters(router);
}
