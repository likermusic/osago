import { useEffect } from 'react';

export const useSubscribeOnAnalyticsEvent = (
  eventName: string,
  sendEvent: EventListener,
  eventTarget?: Nullable<EventTarget>,
) => {
  useEffect(() => {
    if (!window) return;
    const target = eventTarget || window;

    target.addEventListener(eventName, sendEvent);
    return () => target.removeEventListener(eventName, sendEvent);
  }, [eventName, eventTarget, sendEvent]);
};
