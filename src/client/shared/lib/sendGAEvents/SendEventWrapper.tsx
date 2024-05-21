import { useRef } from 'react';

import type { IEventFieldsValueChange } from 'shared/lib/sendGAEvents/events';
import { useSubscribeOnCustomFormAnalyticsEvent } from 'shared/lib/useSubscribeOnAnalyticsEvent/useSubscribeOnCustomFormAnalyticsEvent';

export interface ISendEventWrapper {
  sendEvent: (arg: Pick<IEventFieldsValueChange, 'newValue' | 'fieldName' | 'previousValue'>) => void;
}

export const SendEventWrapper: FC<ISendEventWrapper> = ({ sendEvent, children }) => {
  const formRef = useRef<HTMLDivElement | null>(null);

  useSubscribeOnCustomFormAnalyticsEvent(sendEvent);

  return <div ref={formRef}>{children}</div>;
};
