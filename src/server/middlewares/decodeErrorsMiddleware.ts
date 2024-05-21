import logger from '@sravni/server-utils/lib/logger';
import type { Next } from 'koa';

export async function decodeErrorsMiddleware(ctx: App.ExtendedContext, next: Next): Promise<void> {
  try {
    await next();
  } catch (err) {
    err.status = err.statusCode || err.status || 500;
    ctx.body = err.message;

    logger.error({
      exception: err,
      message: '[ОШИБКА ВНЕШНЕГО АПИ]',
      meta: {
        url: ctx.req?.url,
        params: ctx.params,
        body: ctx.req?.body,
      },
    });

    if ('response' in err) {
      ctx.status = err.response?.status || 500;
      ctx.body = err.response?.data?.error || err.message;

      return;
    }

    if ('status' in err) {
      ctx.status = err.status;
      ctx.body = err.message;
      return;
    }

    ctx.status = 500;
    ctx.body = err.message;
  }
}
