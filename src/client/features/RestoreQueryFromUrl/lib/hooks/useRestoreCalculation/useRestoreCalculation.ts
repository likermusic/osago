import { useEffect, useRef, useState } from 'react';

import type { Query } from 'commonTypes/api/query';

import { localStorageKeys } from 'shared/config/localStorageKeys';
import { RestorationFormEventMediator } from 'shared/lib';
import { customSessionStorage } from 'shared/lib/customStorage';
import { useAppDispatch } from 'shared/lib/redux';
import { sendSentryClientError } from 'shared/lib/sendSentryClientError';
import { useDeeplink } from 'shared/lib/useDeeplink';

import { restoreDataByCarNumberThunk, useGetBrands } from 'entities/carInfo';

import { getFormAdditionalDataThunk, tryToRestoreData } from '../../utils';

import { useRestorationController } from './useRestoreController';

interface IUseRestoreCalculation {
  /* Коллбек вызывается в случае успешного восстановления
   * (смогли восстановить инфу, но !!! вызов коллбека не говорит о том что инфа полная или на 100% валидная)
   */
  successCallback?: (query: Query.TRestoreCalculationQueryResponse | null) => void;
  /* Коллбек вызывается в случае неуспешного восстановления (кривой хеш, бек не ответил, не нашли инфу по хешу и тд)  */
  errorCallback?: () => void;
  /* Флаги */
  shouldUseStoreFirst?: boolean;
}

export const useRestoreCalculation = (props: IUseRestoreCalculation = {}) => {
  // чтобы не дергать восстановление на каждый чих, получаем данные только в самом начале
  const onceRestoreProps = useRef(props);
  useGetBrands();
  useRestorationController();
  // Стартовое состояние true, так как setState асинхронный и на первый рендер isLoading = false
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const dispatch = useAppDispatch();

  // Берем данные из урла только один раз, чтобы не восстанавливать калькуляцию при изменении урла в браузере
  const queryParamsOnce = useRef(useDeeplink().params);

  useEffect(() => {
    // eslint-disable-next-line max-statements
    (async () => {
      const { shouldUseStoreFirst, successCallback, errorCallback } = onceRestoreProps.current;
      setIsLoading(true);
      setIsError(false);

      const { calculationHash, orderOrProlongationHash, hash, searchId, autoNumber, sessionQuery, regNumberToken } =
        queryParamsOnce.current || {};

      const isRestorationLinkExist =
        calculationHash ||
        orderOrProlongationHash ||
        (hash && searchId) ||
        autoNumber ||
        sessionQuery ||
        regNumberToken;

      /**
       * Уже есть данные и переход был не по прямой ссылке - не нужно пытаться их восстанавливать
       * */
      if (shouldUseStoreFirst && !isRestorationLinkExist) {
        setIsLoading(false);
        successCallback?.(null);
        return;
      }

      let data = null;

      try {
        if (queryParamsOnce.current.autoNumber) {
          await dispatch(restoreDataByCarNumberThunk(queryParamsOnce.current.autoNumber));
          RestorationFormEventMediator.generateEvent({
            type: 'LOCAL_STORAGE',
            payload: { carNumber: queryParamsOnce.current.autoNumber },
          });
        } else {
          data = await dispatch(tryToRestoreData(queryParamsOnce.current));
          if (!data) throw new Error('Cannot restore data');

          await dispatch(getFormAdditionalDataThunk(data));
        }

        successCallback?.(data);
      } catch (e) {
        const previousStep = customSessionStorage.get(localStorageKeys.previousStepName);

        const sentryParams = {
          tags: {
            calculationHash,
            orderOrProlongationHash,
            hash,
            searchId,
            autoNumber,
            sessionQuery,
            previousStep,
          },
          query: JSON.stringify(data),
          level: 'log',
          previousStep,
          error: JSON.stringify(e),
        };
        /**
         * В случае если мы пытались восстановить данные формы по ссылкам восстановления, но не смогли логируем
         * */
        if (isRestorationLinkExist) {
          sendSentryClientError('Не смогли восстановить данные формы по ссылке восстановления, rev-2', {
            place: 'useRestoreCalculation',
            ...sentryParams,
          });
        } else if (shouldUseStoreFirst) {
          /**
           * В случае если был SPA переход, но произошла ошибка логируем
           * */

          sendSentryClientError(
            'Не хватило данных в сторе при переходе между страницами, при переходе без ссылки восстановления',
            {
              place: 'useRestoreCalculation',
              ...sentryParams,
            },
          );
        }

        /**
         * в случае если мы не смогли восстановить данные формы - вызываем колбек
         * */
        errorCallback?.();
        setIsError(true);
      }

      setIsLoading(false);
    })();
  }, [dispatch]);

  return { isLoading, isError };
};
