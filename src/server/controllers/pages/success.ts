import { APP_ROUTES } from '../../../constants/routes';
import * as metadataService from '../../services/metadata';
import * as settingsService from '../../services/sitesettings';
import { combinePromises } from '../../utils/combinePromises';
import { getOtherPagesSeoParams } from '../helpers/getOtherPagesSeoParams';

export async function successController(ctx: App.ExtendedContext): Promise<void> {
  const { result } = ctx.query;

  if (result === 'fail') {
    // если по какой-то причине в эквайринге оплатить не удалось, надо сделать редирект на failPage
    ctx.redirect(`${APP_ROUTES.failure}?${ctx.querystring}`);
    return;
  }

  const { settings, metadata } = await combinePromises({
    settings: settingsService.findWithCache(),
    metadata: metadataService.findMeta(getOtherPagesSeoParams(ctx)),
  });

  ctx.req.__SITE_SETTINGS__ = settings;
  ctx.req.__SEO__ = metadata;

  ctx.response.body = await ctx.renderToHTML(APP_ROUTES.success);
}
