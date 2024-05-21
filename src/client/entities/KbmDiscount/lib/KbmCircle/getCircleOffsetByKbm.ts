import { getDiscountPercentByKbm } from '../getDiscountPercentByKbm';

import { getDiscountPercentByKbmForCircle } from './getDiscountPercentByKbmForCircle';
import { CIRCLE_CONFIG } from './KbmCircle.constants';

export const getCircleOffsetByKbm = (kbm: number) =>
  kbm >= 1
    ? (1 - getDiscountPercentByKbmForCircle(kbm)) * CIRCLE_CONFIG.CIRCUMFERENCE
    : (1 - getDiscountPercentByKbm(kbm) / 100) * CIRCLE_CONFIG.CIRCUMFERENCE;
