import type { EventCategories, EventTypes } from 'commonTypes/ga';

export type AnaliticsValue = Array<number | string> | number | string | undefined;

export interface IInitialEvent {
  event: EventTypes;
  eventCategory?: EventCategories;
  eventAction?: AnaliticsValue;
  eventLabel?: AnaliticsValue;
  eventValue?: AnaliticsValue;
  leadID?: AnaliticsValue;
  eventCallback?: () => void;
  title?: AnaliticsValue;
  path?: AnaliticsValue;
}
