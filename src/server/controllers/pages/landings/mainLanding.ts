import { APP_ROUTES } from '../../../../constants/routes';

export async function mainLandingPageController(ctx: App.ExtendedContext): Promise<void> {
  ctx.response.body = await ctx.renderToHTML(APP_ROUTES.main);
}
