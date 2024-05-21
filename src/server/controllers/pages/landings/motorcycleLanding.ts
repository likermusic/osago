import { APP_ROUTES } from '../../../../constants/routes';

export async function motorcycleLandingPageController(ctx: App.ExtendedContext): Promise<void> {
  ctx.req.__VEHICLE_TYPE__ = 'motorcycle';

  ctx.response.body = await ctx.renderToHTML(APP_ROUTES.motorcycle);
}
