import { NotFoundError } from '@sravni/utils/lib/errors/network/NotFoundError';

export async function errorPageController(ctx: App.ExtendedContext): Promise<void> {
  ctx.throw(new NotFoundError());
}
