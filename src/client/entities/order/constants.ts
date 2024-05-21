import type { TOrderStatus } from './types';

export const ORDER_ERROR_ALERT = [
  {
    color: 'red',
    title: 'Страховая не ответила',
    subtitle: 'Что-то пошло не так. Попробуйте еще раз или выберите другое предложение',
    action: 'None',
  } as const,
];

//  priceChanged проверяется что цена меняется в большую сторону
export const SHOULD_SHOW_FORWARDING_ARRAY: TOrderStatus[] = [
  'dateChanged',
  'rejected',
  'allRejected',
  'priceAndDateChanged',
  'priceChanged',
];
export const DATE_VALUE_ALL = 'all';
export const ORDER_CONFIRMED_STATUS: TOrderStatus[] = ['success', 'dateChanged', 'priceChanged', 'priceAndDateChanged'];

export const DEFAULT_ORDER_PROPOSITION_STATUS = 'loading';
