import type { TActiveElementClickInterceptor } from './activeElementClickInterceptor.types';

export const isEventFromActiveElement = (e: TActiveElementClickInterceptor) =>
  // проверяем что клик пришел с области, которая размечена функцией "setActiveElementFlag"
  e.isActiveElement;
