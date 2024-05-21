import { ThemeName } from '@sravni/design-system-theme';
import type { Next } from 'koa';

export default function setTheme(ctx: App.ExtendedContext, next: Next): Promise<void> {
  ctx.req.__THEME__ = ThemeName.lager;

  // На WL тема всегда светлая
  if (ctx.theme && !ctx.req.__WL__?.partnerId) {
    ctx.req.__THEME__ = ctx.theme;
  }

  return next();
}
