import type { DoGetRequestProps } from './interface';

export const doGetRequest = async <T, TConfig>(
  params: DoGetRequestProps<TConfig>,
): Promise<{
  data: T;
  status: number;
}> => {
  const { method, url, config, headers, retryCount = 0, checkRetry } = params;

  try {
    return await method<T>(url, {
      ...config,
      headers,
    });
  } catch (e) {
    if (checkRetry(retryCount, e?.status)) {
      return doGetRequest({ ...params, retryCount: retryCount + 1 });
    }
    throw e;
  }
};
