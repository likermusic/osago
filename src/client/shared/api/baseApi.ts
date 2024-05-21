import type { FetchArgs } from '@reduxjs/toolkit/query/react';
import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
import getConfig from 'next/config';

import { BASE_TIMEOUT } from 'constants/apiTimeout';

import { isSkipRetry } from 'shared/api/lib';

const { apiPrefix = '' } = getConfig()?.publicRuntimeConfig ?? {};

// TODO: пооразобраться почему это  г̶о̶в̶н̶о̶ ртк не реагирует на  extraOptions: { maxRetries: 0 },в кверях
// https://sravni-corp.atlassian.net/browse/OS-7611
// дока https://redux-toolkit.js.org/rtk-query/usage/customizing-queries#automatic-retries
const staggeredBaseQuery = retry(
  async (args: string | FetchArgs, api, extraOptions) => {
    const result = await fetchBaseQuery({ baseUrl: apiPrefix, timeout: BASE_TIMEOUT })(args, api, extraOptions);

    // Скипаем ретраи для кодов которые нельзя ретраить
    if (result.error) {
      let { status } = result.error;
      if ('originalStatus' in result.error) {
        status = result.error.originalStatus;
      }

      if (isSkipRetry(status)) {
        retry.fail(result.error);
      }
    }

    return result;
  },
  {
    maxRetries: 3,
  },
);

export const baseRTKApi = createApi({
  /** Cache tags */
  tagTypes: [],

  /** Reduce store unique name */
  reducerPath: 'api',

  /** async function implementation, can be reimplemented with axios here */
  baseQuery: staggeredBaseQuery,

  /** custom endpoints */
  endpoints: () => ({}),
});
