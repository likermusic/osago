import type { Next } from 'koa';

import { parseUrlQuery, objectToQuery } from '../../../commonUtils';
import { SHOULD_REDIRECT_RESTORATION_LINKS_TO_PAGE } from '../../../constants/FEATURE_FLAGS';
import { APP_ROUTES } from '../../../constants/routes';

/**
 * Мидлвара анализирует ссылку и перенаправляет пользователя на страницу анкеты,
 * если у него в урле есть параметры по которым можно восстановить кверю
 * */
export function restoreRedirectToAnketaPage(ctx: App.ExtendedContext, next: Next): Promise<void> {
  const { regNumberToken } = parseUrlQuery(ctx.query);

  if (regNumberToken && SHOULD_REDIRECT_RESTORATION_LINKS_TO_PAGE) {
    // Механизм восстановления калькуляции принадлежит anketa и для его запуска просто делаем редирект на страницу
    ctx.redirect(`${APP_ROUTES.anketa}?${objectToQuery(ctx.query)}`, 301);
    return Promise.resolve();
  }

  // если ничего из перечисленных параметров в ссылке нет, значит игнорируем этот мидлварь
  return next();
}
