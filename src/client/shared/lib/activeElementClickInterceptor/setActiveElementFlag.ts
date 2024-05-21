import type { TActiveElementClickInterceptor } from './activeElementClickInterceptor.types';

export const setActiveElementFlag = (e: TActiveElementClickInterceptor) => {
  /**
   * Добавляем к событию дополнительный флаг,
   * который указывает что событие было в области активного элемента
   * */
  e.isActiveElement = true;
};
