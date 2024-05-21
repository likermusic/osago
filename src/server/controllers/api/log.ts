import logger from '@sravni/server-utils/lib/logger';
import type { Context } from 'koa';

export async function log(ctx: Context) {
  logger.log({
    level: 'info',
    message: (ctx.request.body as Record<string, unknown> | undefined)?.message as string,
    meta: (ctx.request.body as Record<string, unknown> | undefined)?.info as Record<string, unknown>,
  });
  ctx.body = 'Ok';
}
