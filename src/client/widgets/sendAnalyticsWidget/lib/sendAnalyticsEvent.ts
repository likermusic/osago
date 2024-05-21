import { BFF_PROXY_API } from 'constants/apiRoutes';

import { axiosWithoutRetries } from 'shared/api/requestInstance';
import { sendSentryClientError } from 'shared/lib/sendSentryClientError';

import type { TSendAnalytics } from '../types';

export const sendAnalyticsEvent = async (request: TSendAnalytics) => {
  try {
    await axiosWithoutRetries.post(BFF_PROXY_API.sendAnalyticsEvent, request);
  } catch (e) {
    sendSentryClientError(e, request);
  }
};
