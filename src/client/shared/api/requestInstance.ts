import type { AxiosError } from 'axios';
import axios from 'axios';

import { isSkipRetry } from 'shared/api/lib';

import { AXIOS_CONFIG, MAX_RETRY_COUNT, PROGRESSIVE_DELAY } from './constants';

declare module 'axios' {
  export interface AxiosRequestConfig {
    _currentRetry?: number;
    _retryDelay?: number;
  }
}

/**
 * Использовать для НЕ идемпотентных запросов,
 * которые могут создавать дубли записей в БД
 * */
export const axiosWithoutRetries = axios.create(AXIOS_CONFIG);

/**
 * Использовать для идемпотентных запросов,
 * которые не вызовут дублирования данных на бэке
 * */
export const axiosWithRetry = axios.create({
  ...AXIOS_CONFIG,
  _currentRetry: MAX_RETRY_COUNT,
  _retryDelay: 1000,
});

axiosWithRetry.interceptors.response.use(undefined, (err: AxiosError) => {
  const { config, response } = err || {};

  if (!config?._currentRetry) {
    return Promise.reject(err);
  }

  if (isSkipRetry(response?.status)) {
    config._currentRetry = 0;
    return Promise.reject(err);
  }

  config._currentRetry -= 1;

  const delayRetryRequest = new Promise((resolve) => {
    setTimeout(() => {
      resolve(err);
    }, PROGRESSIVE_DELAY[String(config._currentRetry)] || config._retryDelay);
  });

  return delayRetryRequest.then(() => axiosWithRetry(config));
});
