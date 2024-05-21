import type { PropositionCalculations } from 'commonTypes/api/propositionCalculations';

import { sendSentryClientErrorOnce } from 'shared/lib/sendSentryClientError';

import type { TOrderStatus } from '../../types';

export const mapOrderStatus = (
  orderStatus: PropositionCalculations.GetManyOrders['orderInfo']['orderStatus'],
  isPriceChanged: boolean,
  isCompleted: boolean,
  offersLength: number,
): TOrderStatus => {
  if (!orderStatus) return 'initial';

  if (orderStatus === 'DateChanged' && isPriceChanged) {
    return 'priceAndDateChanged';
  }
  if (orderStatus === 'DateChanged') {
    return 'dateChanged';
  }
  if (isPriceChanged) {
    return 'priceChanged';
  }
  if (orderStatus === 'Success') {
    return 'success';
  }

  // только когда isCompleted false
  if (orderStatus === 'Loading' && !isCompleted) {
    return 'loading';
  }
  if (orderStatus === 'Failed' && !isCompleted) {
    return 'rejected';
  }

  if (isCompleted) {
    return offersLength > 0 ? 'rejected' : 'allRejected';
  }

  // сюда не должны попадать
  sendSentryClientErrorOnce(true, 'get unexpected status in "mapOrderStatus"', {
    orderStatus,
    isPriceChanged,
    offers: offersLength,
    isCompleted,
  });
  return 'loading';
};
