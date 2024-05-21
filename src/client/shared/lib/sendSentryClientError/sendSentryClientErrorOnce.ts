import { isProduction } from '../isProduction';

import { sendSentryClientError } from './sendSentryClientError';

/*
 * Если нужно сделать замыкание внутри конкретного места, а не глобально
 */
export const sendSentryClientErrorScope = () => {
  const set = new Set();
  const isProductionValue = isProduction();
  return (idOrSameAsMessage: string | true, ...arg: Parameters<typeof sendSentryClientError>) => {
    const uniqueId = idOrSameAsMessage === true && typeof arg[0] === 'string' ? arg[0] : idOrSameAsMessage;

    if (!set.has(uniqueId)) {
      sendSentryClientError(...arg);
      // если не в продакшене, то пусть разносит нам и тестерам консоль ошибками
      uniqueId && !isProductionValue && set.add(uniqueId);
    }
  };
};

/*
 * Чтобы не отправлять 100500 одинаковых событий для одного юзера используем эту функцию
 * особенно актуально при логировании маперов
 */
export const sendSentryClientErrorOnce = sendSentryClientErrorScope();
