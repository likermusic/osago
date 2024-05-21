import type { SerializedError } from '@reduxjs/toolkit';
import type { FetchBaseQueryError, SubscriptionOptions } from '@reduxjs/toolkit/query';
import { useCallback, useEffect, useRef, useState } from 'react';

import { DEFAULT_MAX_RETRIES } from 'shared/config/maxRetries';

type TPpdateSubscriptionOptions = (options: SubscriptionOptions) => void;

export type TUsePolling<T> = (args: T) => {
  updateSubscriptionOptions: TPpdateSubscriptionOptions;
  abort: () => void;
};

type RtkError = FetchBaseQueryError | SerializedError | undefined;

/**
 * @deprecated use Polling class instead
 * @param pollingFunction функция которая отправляет запрос
 * @param pollingInterval интервал пуллинга
 * @param maxPolingInterval время пуллинга
 * @param rtkError - из-за того что мы используем кастомное решение для пуллинга и ртк о нем ничего не знает
 * то после первого падения запроса по ретраям и перезапуске пуллинга error из ртк будет приходить не пустой
 * для этого мы проверяем, что currentTick уже совершил хотя бы 4 ретрая или один упешный запрос и у нас сбросилась ошибка
 * @param errorRetriesAmount - количество ретраев заданных внутри query для данного запроса по умолчанию равно DEFAULT_MAX_RETRIES
 **/
export function usePolling<T>(
  pollingFunction: TUsePolling<T>,
  pollingInterval: number,
  maxPolingInterval: number,
  rtkError: RtkError,
  errorRetriesAmount: number = DEFAULT_MAX_RETRIES,
) {
  const currentSetPolingOptions = useRef<TPpdateSubscriptionOptions>();
  const currentQueryAbort = useRef<Function>();
  const pollingTimer = useRef<number>(0);
  const [isActive, setIsActive] = useState(false);
  const [currentTick, setCurrentTick] = useState(0);
  const [isTimeOver, setIsTimeOver] = useState(false);
  const maxTicks = Math.round(maxPolingInterval / pollingInterval);

  const [error, setError] = useState<RtkError>(undefined);

  const startPoling = useCallback(
    (args: T) => {
      setError(undefined);

      if (currentSetPolingOptions.current) {
        currentSetPolingOptions.current({ pollingInterval });
      }

      if (currentQueryAbort.current) {
        currentQueryAbort.current();
      }

      const { updateSubscriptionOptions, abort } = pollingFunction(args);
      currentSetPolingOptions.current = updateSubscriptionOptions;
      currentQueryAbort.current = abort;
      setIsActive(true);
      updateSubscriptionOptions({ pollingInterval });
    },
    [pollingFunction, pollingInterval],
  );

  const stopPoling = useCallback(() => {
    setIsActive(false);
    setCurrentTick(0);
    currentSetPolingOptions.current?.({
      pollingInterval: 0,
    });
    currentQueryAbort.current?.();
    clearInterval(pollingTimer.current);
  }, []);

  useEffect(() => {
    if (currentTick >= errorRetriesAmount + 1) {
      setError(rtkError);
      rtkError && stopPoling();
    }
  }, [currentTick, errorRetriesAmount, rtkError, stopPoling]);

  useEffect(() => {
    clearInterval(pollingTimer.current);
    if (isActive) {
      pollingTimer.current = window.setInterval(() => {
        const newTickValue = currentTick + 1;
        setCurrentTick(newTickValue);
        if (maxTicks <= newTickValue) {
          stopPoling();
          setIsTimeOver(true);
        }
      }, pollingInterval);
    }
  }, [currentTick, isActive, maxTicks, pollingInterval, stopPoling]);

  return {
    startPoling,
    stopPoling,
    isActive,
    isTimeOver,
    error,
  };
}
