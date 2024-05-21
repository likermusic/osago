import {
  ANALYTIC_EVENT,
  ANALYTIC_EVENT_TEXT_TYPE_FORM_FIELD_ONBLUR,
  ANALYTIC_EVENT_TYPE_FORM_SELECT_FIELD_CHANGE,
} from '@sravni/cosago-react-library/lib/constants';
import type { IAnalyticsEventFormField, IAnalyticsEvent } from '@sravni/cosago-react-library/lib/types';

export const isEventCustomAnalyticsEvent = <T>(event: Event): event is CustomEvent<IAnalyticsEvent<T>> =>
  event.type === ANALYTIC_EVENT;
export const isOnHandleChangeCustomEvent = (
  event: Event,
): event is CustomEvent<IAnalyticsEvent<IAnalyticsEventFormField>> =>
  isEventCustomAnalyticsEvent(event) && event?.detail?.type === ANALYTIC_EVENT_TYPE_FORM_SELECT_FIELD_CHANGE;
export const isOnBlurCustomEvent = (event: Event): event is CustomEvent<IAnalyticsEvent<IAnalyticsEventFormField>> =>
  isEventCustomAnalyticsEvent(event) && event?.detail?.type === ANALYTIC_EVENT_TEXT_TYPE_FORM_FIELD_ONBLUR;
