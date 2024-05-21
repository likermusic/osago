import type { ClearCache } from 'commonTypes/api/clearCache';
import { BFF_PROXY_API } from 'constants/apiRoutes';

import { axiosWithoutRetries } from 'shared/api/requestInstance';
import { sendSentryClientError } from 'shared/lib/sendSentryClientError';

export const clearCache = async (orderHash: string) => {
  try {
    if (!orderHash) throw new Error('Отсутствует orderHash');

    const { data } = await axiosWithoutRetries.post<{ orderHash: string }, { data: ClearCache.Response }>(
      BFF_PROXY_API.clearCache,
      { orderHash },
    );

    if (data.hasError) throw new Error(data.error || undefined);

    return true;
  } catch (err) {
    sendSentryClientError(err, {
      message: 'v1/order/{orderHash} ответил с ошибкой',
      place: 'Failure page',
      orderHash,
    });

    return false;
  }
};
