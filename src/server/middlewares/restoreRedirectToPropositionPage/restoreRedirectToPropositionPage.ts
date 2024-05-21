import type { Next } from 'koa';

import { parseUrlQuery, objectToQuery } from '../../../commonUtils';
import { SHOULD_REDIRECT_RESTORATION_LINKS_TO_PAGE } from '../../../constants/FEATURE_FLAGS';
import { APP_ROUTES } from '../../../constants/routes';

/**
 * Если у полиса есть префикс os - это значит, что ордер по нему не создавался.
 * И на самари он не пройдет через проверку с ценой - ордер по такому полису еще не создавался
 * Так что сразу отправляем его на выдачу
 * */
const PROLONGATION_SEARCH_ORDER_HASH_PREFIX = 'os|';
/**
 * Мидлвара анализирует ссылку и перенаправляет пользователя на страницу выдачи,
 * если у него в урле есть параметры по которым можно восстановить калькуляцию
 * */
export function restoreRedirectToPropositionPage(ctx: App.ExtendedContext, next: Next): Promise<void> {
  const { hash, calculationHash, searchId, prolongationHash, orderOrProlongationHash } = parseUrlQuery(ctx.query);

  if (
    (calculationHash ||
      (hash && searchId) ||
      prolongationHash ||
      orderOrProlongationHash.includes(PROLONGATION_SEARCH_ORDER_HASH_PREFIX)) &&
    SHOULD_REDIRECT_RESTORATION_LINKS_TO_PAGE
  ) {
    // Механизм восстановления калькуляции принадлежит выдаче и для его запуска просто делаем редирект на страницу выдачи
    ctx.redirect(`${APP_ROUTES.propositions}?${objectToQuery(ctx.query)}`, 301);
    return Promise.resolve();
  }

  // если ничего из перечисленных параметров в ссылке нет, значит игнорируем этот мидлварь
  return next();
}
