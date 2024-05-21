import type { Next } from 'koa';

import { getOtherPagesSeoParams } from '../controllers/helpers/getOtherPagesSeoParams';
import * as metadataService from '../services/metadata';
import * as settingsService from '../services/sitesettings';

export async function setLandingPagesSeoData(ctx: App.ExtendedContext, next: Next): Promise<void> {
  const metadataParams = getOtherPagesSeoParams(ctx);

  const [settings, metadata] = await Promise.all([
    settingsService.findWithCache(),
    metadataService.findMeta(metadataParams),
  ]);

  ctx.req.__SITE_SETTINGS__ = settings;
  ctx.req.__SEO__ = metadata;
  ctx.req.__SEO_META__ = {
    locationId: metadataParams.location.id,
  };

  return next();
}
