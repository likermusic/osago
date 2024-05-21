export type EventTypes = 'adEvent' | 'mainEvent' | 'pageViewGA';

export type EventCategories = 'КАСКО' | 'ОСАГО';

interface IDataLayerEvent {
  event: EventTypes;
  eventAction?: string;
  eventCallback?: () => void;
  eventCategory: EventCategories;
  eventLabel?: string;
  eventValue?: string | number;
  title?: string;
  path?: string;
}
