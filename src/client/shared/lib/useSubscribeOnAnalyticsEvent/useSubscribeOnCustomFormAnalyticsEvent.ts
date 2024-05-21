import { ANALYTIC_EVENT } from '@sravni/cosago-react-library/lib/constants';
import type { IAnalyticsEventFormField } from '@sravni/cosago-react-library/lib/types';

import { sendAnalyticEvent } from './sendAnalyticEvent';
import { useSubscribeOnAnalyticsEvent } from './useSubscribeOnAnalyticsEvent';

// CustomEvent<IAnalyticsEvent<IAnalyticsEventFormField>>

/*
 * перехватываем все кастомные события формы и отправляем их в аналитику
 */
export const useSubscribeOnCustomFormAnalyticsEvent = (
  sendEvent: (e: IAnalyticsEventFormField) => void,
  eventTarget?: Nullable<EventTarget>,
) => {
  useSubscribeOnAnalyticsEvent(ANALYTIC_EVENT, sendAnalyticEvent(sendEvent), eventTarget);
};
