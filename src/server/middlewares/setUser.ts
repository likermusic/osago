import * as Sentry from '@sentry/nextjs';
import { formatUserData } from '@sravni/utils/lib/auth';
import type { Next } from 'koa';

import { checkUserHasEsia } from '../services/user';

export default async function setUser(ctx: App.ExtendedContext, next: Next): Promise<void> {
  if (ctx.user) {
    const isHasEsia = await checkUserHasEsia(ctx.user.sub);

    ctx.req.__USER__ = { ...formatUserData(ctx.user, ['phone_number', 'email']), isHasEsia };
  }

  Sentry.setUser({
    id: ctx.user?.sub,
    email: ctx.user?.email,
    username: ctx.user?.nickname,
  });

  return next();
}
