import { Common } from '@sravni/cosago-react-library/lib/constants';
import { addMilliseconds, isPast } from 'date-fns';

import { BFF_PROXY_API } from 'constants/apiRoutes';

import { axiosWithRetry } from 'shared/api/requestInstance';
import { ERROR_CANCELED_CODE } from 'shared/config/axios';
import type { TErrorAction, TPolling, TSuccessAction, IPollingAbs } from 'shared/lib/Polling/types';

export class Polling<Response> implements IPollingAbs<Response> {
  private timerId = 0;
  private isFinished = false;
  private threshold = new Date();
  private readonly pollingIntervalMs;
  private maxPollingIntervalMs;
  private abortController: Nullable<AbortController> = null;
  private readonly url: string;

  private onError?: TErrorAction;
  private onSuccess?: TSuccessAction<Response>;

  /**
   * @param pollingIntervalMs время паузы между запросами в милисекундах
   * @param maxPollingIntervalMs сколько будет длиться пуллинг в милисекундах
   * @param urlKey соответствует АПИ пути в BFF_PROXY_API
   **/
  constructor({ maxPollingIntervalMs, pollingIntervalMs, urlKey }: TPolling) {
    this.pollingIntervalMs = pollingIntervalMs;
    this.maxPollingIntervalMs = maxPollingIntervalMs;
    this.url = BFF_PROXY_API[urlKey];
  }

  public setOnError(onError: TErrorAction): void {
    this.onError = onError;
  }

  public setOnSuccess(onSuccess: TSuccessAction<Response>): void {
    this.onSuccess = onSuccess;
  }

  public startPolling(params: Record<string, unknown>): void {
    // сбрасываем запущенный ранее таймер и текущий запрос на получение данных
    this._initNewPolling();

    // запускаем сторожевой таймер
    this._startWatchDog(
      (): Promise<Response> =>
        // запускаем новый запрос на получение данных
        this._runPollingIteration(params),
    );
  }

  private _initNewPolling() {
    this._stopTimeout();
    this._abortPolling('New iteration started');

    this._setNewThreshold();
    this._setIsFinished(false);
  }

  // Фактический запрос на получение данных из ручки
  private async _runPollingIteration(params: Record<string, unknown>): Promise<Response> {
    this._setAbortController(new AbortController());

    try {
      const { data } = await axiosWithRetry.get<typeof params, { data: Response }>(this.url, {
        params,
        timeout: Common.SECOND * 15,
        signal: this.abortController?.signal,
      });

      return data;
    } finally {
      // у завершенного запроса сбрасываем контроллер, чтобы не кенселить его.
      this._setAbortController(null);
    }
  }

  // экстренный останов поллинга
  public stopPolling() {
    this._setIsFinished(true);
    this._stopTimeout();
    this._abortPolling('Polling manual stop');
  }

  // Запускает сторожевой таймер, который управляет запусками запросов на получение данных
  private async _startWatchDog(callback: () => Promise<Response>) {
    if (this.isFinished) {
      return;
    }

    const isLastTick = this._checkIsFinished();

    try {
      const data = await callback();
      this.onSuccess?.(data, isLastTick);
    } catch (e) {
      // для ошибки отмены запроса не вызываем коллбек
      if (e.code !== ERROR_CANCELED_CODE) this.onError?.(e);
      return;
    }

    if (!isLastTick) {
      this.timerId = window.setTimeout(() => {
        this._startWatchDog(callback);
      }, this.pollingIntervalMs);
    } else {
      this.stopPolling();
    }
  }

  // остановить текущий сторожевой таймер
  private _stopTimeout() {
    clearTimeout(this.timerId);
    this.timerId = 0;
  }

  // сбросить текущий выполняемый запрос в поллинге
  private _abortPolling(reason: string) {
    if (this.abortController) {
      this.abortController.abort(reason);
    }

    this._setAbortController(null);
  }

  private _setAbortController(controller: Nullable<AbortController>): void {
    this.abortController = controller;
  }

  private _setIsFinished(newValue: boolean) {
    this.isFinished = newValue;
  }

  private _setNewThreshold() {
    this.threshold = addMilliseconds(new Date(), this.maxPollingIntervalMs);
  }

  private _checkIsFinished() {
    return isPast(this.threshold);
  }
}
