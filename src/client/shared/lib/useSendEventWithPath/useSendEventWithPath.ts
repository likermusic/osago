import type { TAnalyticsPage } from '../sendGAEvents/events';

import { useVirtualPage } from './useVirtualPage';

export const useSendEventWithPath = <T>(event: (page: TAnalyticsPage) => T) => {
  const virtualPath = useVirtualPage();
  return event(virtualPath);
};
