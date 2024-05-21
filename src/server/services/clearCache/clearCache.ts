import type { ClearCache } from 'commonTypes/api/clearCache';

import { config } from '../../constants/config';
import { requestWithoutTokenPost } from '../../utils/api/api';

export const clearCacheRequest = async (orderHash: string) => {
  const { data } = await requestWithoutTokenPost<ClearCache.Response>(
    `${config.OSAGO_STAFF}/v1/order/${encodeURI(orderHash)}/clear-cache`,
  );

  return data;
};
