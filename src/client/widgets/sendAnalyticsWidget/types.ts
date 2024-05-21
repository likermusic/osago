import type { Analytics } from 'commonTypes/api/analytics';

import type { TEventNames } from 'shared/types/TEventNames';

export type TSendAnalytics = Omit<Analytics.TEventsRequest, 'userAgent' | 'userToken' | 'eventName'> & {
  eventName: TEventNames;
};
