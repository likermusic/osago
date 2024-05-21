import type { IAnalyticsEventFormField } from '@sravni/cosago-react-library/lib/types';

import { isOnBlurCustomEvent, isOnHandleChangeCustomEvent } from 'shared/lib/useSubscribeOnAnalyticsEvent/typeGuards';

export const sendAnalyticEvent = (sendEvent: (e: IAnalyticsEventFormField) => void) => (e: Event) => {
  if (isOnHandleChangeCustomEvent(e) || isOnBlurCustomEvent(e)) {
    const previousValue = e.detail.data?.previousValue;
    const newValue = e.detail.data?.newValue;

    const shouldSendEvent = previousValue !== newValue && (previousValue || newValue);
    shouldSendEvent && sendEvent(e.detail.data);

    // нужно чтобы не обрабатывать событие два раза
    // например если мы уже обработали событие на уровне компонента и оно не должно всплыть до app
    e.stopImmediatePropagation();
  }
};
