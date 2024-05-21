import { APP_ROUTES } from '../../../../constants/routes';
import { DEFAULT_REGION } from '../../../constants/locations';
import * as metadataService from '../../../services/metadata';
import * as settingsService from '../../../services/sitesettings';
import { getLocationSeoParams } from '../../../utils/metadata';

export async function win3carsController(ctx: App.ExtendedContext): Promise<void> {
  const location = ctx.req.__SELECTED_LOCATION__ || DEFAULT_REGION;
  const { paramRegion } = ctx.params;
  const seoParams = {
    url: '/osago/',
    location: paramRegion ? getLocationSeoParams(location) : undefined,
  };

  const [settings, metadata] = await Promise.all([
    settingsService.findWithCache(),
    metadataService.findMeta(seoParams),
  ]);

  ctx.req.__SITE_SETTINGS__ = settings;
  ctx.req.__SEO__ = metadata;

  ctx.response.body = await ctx.renderToHTML(APP_ROUTES.win3cars);
}
