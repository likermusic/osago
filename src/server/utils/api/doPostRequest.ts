// import { checkRetry } from './checkRetry';
import type { DoPostRequestProps } from './interface';

export const doPostRequest = async <T, TData, TConfig>(
  props: DoPostRequestProps<TConfig, TData>,
): Promise<{
  data: T;
  status: number;
}> => {
  const { config, headers, method, url, data, retryCount = 0, checkRetry } = props;
  try {
    return await method<T>(url, data ?? {}, {
      ...config,
      headers,
    });
  } catch (e) {
    if (checkRetry(retryCount, e?.status)) {
      return doPostRequest({ ...props, retryCount: retryCount + 1, checkRetry });
    }
    throw e;
  }
};
