import { MAX_KBM } from '../KbmDiscount.contants';

import { CIRCLE_CONFIG } from './KbmCircle.constants';

// У нас заполнено 50% окружности (0.5) и нужно заполнить еще 25% окружности
// Берем максимальный КБМ и умножаем его на 4, так как нужно заполнить 1/4 круга
// Далее просто считаем часть заполнения и складываем
export const getDiscountPercentByKbmForCircle = (kbm: number) =>
  Math.round((CIRCLE_CONFIG.OFFSET_CIRCLE_PART + kbm / (CIRCLE_CONFIG.CIRCLE_PARTS * MAX_KBM)) * 100) / 100;
