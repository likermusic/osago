import type { Next } from 'koa';

import { parseUrlQuery, objectToQuery } from '../../../commonUtils';
import { SHOULD_REDIRECT_RESTORATION_LINKS_TO_PAGE } from '../../../constants/FEATURE_FLAGS';
import { APP_ROUTES } from '../../../constants/routes';

/**
 * Мидлвара анализирует ссылку и перенаправляет пользователя на страницу загрузчика для триггерной коммуникации,
 * если у него в урле есть ТОЛЬКО hash и searchId(восстановление по тригерке недозаполненной анкеты)
 * */
export function restoreRedirectForTriggerCommunication(ctx: App.ExtendedContext, next: Next): Promise<void> {
  const { hash, calculationHash, searchId, orderOrProlongationHash } = parseUrlQuery(ctx.query);

  if (
    !calculationHash &&
    !orderOrProlongationHash &&
    !!(hash && searchId) &&
    SHOULD_REDIRECT_RESTORATION_LINKS_TO_PAGE
  ) {
    ctx.redirect(`${APP_ROUTES.triggerCommunicationLoader}?${objectToQuery(ctx.query)}`, 301);
    return Promise.resolve();
  }

  // если ничего из перечисленных параметров в ссылке нет, значит игнорируем этот мидлварь
  return next();
}
