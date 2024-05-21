import type { TCalculationStatus, TOrderStatus } from './types';

export const CALCULATION_FINISHED_STATUS: TCalculationStatus[] = ['success', 'error', 'empty', 'stoppedByOrder'];

//  priceChanged проверяется что цена меняется в большую сторону
export const SHOULD_SHOW_FORWARDING_ARRAY: TOrderStatus[] = [
  'dateChanged',
  'rejected',
  'allRejected',
  'priceAndDateChanged',
  'priceChanged',
];
