import { useCallback } from 'react';

import { useAppDispatch } from 'shared/lib/redux';
import { SendAnalyticsContext } from 'shared/lib/sendAnalyticsEvents';
import type { TEventNames } from 'shared/types/TEventNames';

import { sendAnalyticsEventThunk } from './sendAnalyticsEventThunk';

export const SendAnalyticsProvider: FC = ({ children }) => {
  const dispatch = useAppDispatch();

  const setEvents = useCallback(
    (eventName: TEventNames) => {
      // setEventNames((prevEventNames) => [prevEventNames[1], eventName]);
      dispatch(sendAnalyticsEventThunk(eventName));
    },
    [dispatch],
  );

  return <SendAnalyticsContext.Provider value={setEvents}>{children}</SendAnalyticsContext.Provider>;
};
