import { useEffect } from 'react';

import { useGetSendAnalytics } from 'shared/lib/sendAnalyticsEvents/useGetSendAnalytics';

import type { TEventNames } from '../../types/TEventNames';

export const useSendAnalytics = (eventName: TEventNames) => {
  const sendAnalyticsEvent = useGetSendAnalytics();

  useEffect(() => {
    sendAnalyticsEvent(eventName);
  }, [sendAnalyticsEvent, eventName]);
};
