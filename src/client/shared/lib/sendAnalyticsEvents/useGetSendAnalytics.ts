import { useCallback, useContext } from 'react';

import type { TEventNames } from '../../types/TEventNames';
import { sendSentryClientErrorOnce } from '../sendSentryClientError';

import { SendAnalyticsContext } from './sendAnalyticsContext';

export const useGetSendAnalytics = () => {
  const sendAnalyticsEventContext = useContext(SendAnalyticsContext);

  const sendAnalyticsEvent = useCallback(
    (eventName: TEventNames) => {
      try {
        if (!sendAnalyticsEventContext)
          throw new Error('useGetSendAnalytics must be called only inside SendAnalyticsProvider');
      } catch (e) {
        sendSentryClientErrorOnce('useGetSendAnalytics', e, { sendAnalyticsEvent });
        return () => {};
      }
      return sendAnalyticsEventContext(eventName);
    },
    [sendAnalyticsEventContext],
  );

  return sendAnalyticsEvent;
};
