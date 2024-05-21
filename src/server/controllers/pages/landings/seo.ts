import * as metadataService from '../../../services/metadata';
import * as settingsService from '../../../services/sitesettings';
import { getLandingSeoParams } from '../../helpers/getLandingSeoParams';

export async function seoLandingPageController(ctx: App.ExtendedContext): Promise<void> {
  const seoParams = await getLandingSeoParams(ctx);

  const [settings, metadata] = await Promise.all([
    settingsService.findWithCache(),
    metadataService.findMeta({
      url: ctx.path,
      carModel: seoParams.car?.model ?? undefined,
      carBrand: seoParams.car?.brand,
      organization: seoParams.company,
      location: seoParams.region,
    }),
  ]);

  ctx.req.__SITE_SETTINGS__ = settings;
  ctx.req.__SEO__ = metadata;
  ctx.req.__SEO_META__ = {
    locationId: seoParams.region?.id,
  };

  ctx.response.body = await ctx.renderToHTML('/osago');
}
