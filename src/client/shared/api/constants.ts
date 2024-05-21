import type { AxiosRequestConfig } from 'axios';

import { BASE_TIMEOUT } from 'constants/apiTimeout';

export const AXIOS_CONFIG: AxiosRequestConfig = {
  timeout: BASE_TIMEOUT,
  responseType: 'json',
  headers: {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'X-Requested-With': 'XMLHttpRequest',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
};

export const MAX_RETRY_COUNT = 3;

export const PROGRESSIVE_DELAY: Record<string, number> = {
  '3': 600,
  '2': 1200,
  '1': 2400,
};
