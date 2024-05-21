import { NotFoundError } from '@sravni/utils/lib/errors/network/NotFoundError';

export const errorApiController = async (ctx: App.ExtendedContext) => {
  ctx.throw(new NotFoundError());
};
