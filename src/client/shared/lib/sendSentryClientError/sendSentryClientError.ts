import * as Sentry from '@sentry/nextjs';
import type { Primitive, Scope, SeverityLevel } from '@sentry/types';

import { isProduction } from 'shared/lib/isProduction';

interface IExtraOptions {
  // если мы точно знаем что ошибка будет крашить браузер
  level?: SeverityLevel;
  tags?: Record<string, Primitive>;
}

const addContextToScope = (scope: Scope, payload?: Record<string, unknown>, extraOptions?: IExtraOptions) => {
  const { level, tags } = extraOptions || {};

  payload && scope.setContext('additional info', payload);
  level && scope.setLevel(level);
  tags && Object.entries(tags).forEach(([key, value]) => scope.setTag(key, value));
  return scope;
};

/**
 * Логгер Sentry, можно использовать в клиентском коде,
 * Для логирования стараемся использовать sendSentryClientErrorOnce дабы не отправлять одинаковые ошибки 100500 раз,
 * использовать только в критических секциях - нагружает Sentry
 * в payload не отправляем большой объем информации сентри просто отклонит евент и мы о нем никоогда не узнаем https://docs.sentry.io/platforms/go/guides/http/enriching-events/context/#size-limitations
 * */
export const sendSentryClientError = (
  e: Error | string,
  payload?: Record<string, unknown>,
  extraOptions?: IExtraOptions,
) => {
  const isProductionValue = isProduction();
  // чтобы при разработке тоже было видно ошибки
  // eslint-disable-next-line no-console
  if (!isProductionValue) console.error(e, payload);

  typeof e === 'string'
    ? Sentry.captureMessage(e, (scope) => addContextToScope(scope, payload, extraOptions))
    : Sentry.captureException(e, (scope) => addContextToScope(scope, payload, extraOptions));
};
