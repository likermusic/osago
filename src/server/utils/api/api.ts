import request from '@sravni/server-utils/lib/request';
import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

import { BASE_TIMEOUT } from '../../../constants/apiTimeout';
import { getErrObject } from '../getErrObject';
import { logMessage } from '../logMessage';
import { getServicesAuthHeader } from '../openid';

import { checkRetryAuthAndCommonCodes, checkRetryAuthCodes, checkRetryCommonCodes } from './checkRetry';
import { doGetRequest } from './doGetRequest';
import { doPostRequest } from './doPostRequest';
import type { TMethod } from './interface';

const requestWithToken =
  (method: TMethod, checkRetry: (retryCount: number, status: number) => boolean) =>
  async <T, TData = undefined>(url: string, serviceNames: string, data?: TData, config?: AxiosRequestConfig) => {
    const headers = (await getServicesAuthHeader(serviceNames)) || {};

    const configWithTimeout = { ...config, timeout: config?.timeout || BASE_TIMEOUT };

    try {
      if (method === request.get) {
        return doGetRequest<T, AxiosRequestConfig>({
          method,
          url,
          config: configWithTimeout,
          headers,
          checkRetry,
        });
      }

      return doPostRequest<T, TData, AxiosRequestConfig>({
        method,
        url,
        data,
        config: configWithTimeout,
        headers,
        checkRetry,
      });
    } catch (e) {
      logMessage('BAD_RESPONSE_WITH_TOKEN', {
        e: getErrObject(e as AxiosError),
        serviceNames,
        url,
        data,
        config,
      });

      throw e;
    }
  };

const addTimeoutToConfig = <T>(config: AxiosRequestConfig<T> | undefined): AxiosRequestConfig<T> => ({
  ...config,
  timeout: config?.timeout || BASE_TIMEOUT,
});

export const requestWithTokenGet = requestWithToken(request.get, checkRetryAuthCodes);
export const requestWithTokenPost = requestWithToken(request.post, checkRetryAuthCodes);

export const requestWithoutTokenPost = <T = unknown, R = AxiosResponse<T>, D = unknown>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig<D>,
) => {
  const configWithTimeout = addTimeoutToConfig<D>(config);

  return request.post<T, R, D>(url, data, configWithTimeout);
};

export const requestWithoutTokenGet = <T = unknown, R = AxiosResponse<T>, D = unknown>(
  url: string,
  config?: AxiosRequestConfig<D>,
) => {
  const configWithTimeout = addTimeoutToConfig<D>(config);

  return request.get<T, R, D>(url, configWithTimeout);
};

export const requestWithTokenGetRetriable = requestWithToken(request.get, checkRetryAuthAndCommonCodes);
export const requestWithTokenPostRetriable = requestWithToken(request.post, checkRetryAuthAndCommonCodes);

export const requestWithoutTokenGetRetriable = <T = unknown, D = unknown>(
  url: string,
  config?: AxiosRequestConfig<D>,
) => {
  const configWithTimeout = addTimeoutToConfig<D>(config);

  return doGetRequest<T, AxiosRequestConfig>({
    method: request.get,
    url,
    config: configWithTimeout,
    checkRetry: checkRetryCommonCodes,
  });
};

export const requestWithoutTokenPostRetriable = <T = unknown, D = unknown>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig<D>,
) => {
  const configWithTimeout = addTimeoutToConfig<D>(config);

  return doPostRequest<T, D, AxiosRequestConfig>({
    method: request.post,
    url,
    data,
    config: configWithTimeout,
    checkRetry: checkRetryCommonCodes,
  });
};
