import type { Next } from 'koa';

import { DEFAULT_REGION } from '../constants/locations';

export default function setSelectedLocation(ctx: App.ExtendedContext, next: Next): Promise<void> {
  if (ctx.selectedLocation) {
    ctx.req.__SELECTED_LOCATION__ = ctx.selectedLocation || DEFAULT_REGION;
  }

  return next();
}
