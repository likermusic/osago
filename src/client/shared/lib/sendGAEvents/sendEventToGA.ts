import { formatValue } from 'shared/lib/sendGAEvents/formatValue';
import type { IInitialEvent } from 'shared/lib/sendGAEvents/interface';

export const sendEventToGA = (event: IInitialEvent, currentWindow = window) => {
  if (typeof currentWindow.sravniDataLayer === 'undefined') {
    currentWindow.sravniDataLayer = [];
  }

  if (event.eventCallback && currentWindow.sravniDataLayer.push === Array.prototype.push) {
    event.eventCallback();
  }

  currentWindow.sravniDataLayer.push({
    event: event.event,
    eventCategory: event.eventCategory || 'ОСАГО',
    eventAction: formatValue(event.eventAction),
    eventLabel: formatValue(event.eventLabel),
    eventValue: formatValue(event.eventValue),
    leadID: formatValue(event.leadID),
    eventCallback: event.eventCallback,
    title: formatValue(event.title),
    path: formatValue(event.path),
  });
};
