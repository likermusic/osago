import type { PropositionCalculations } from 'commonTypes/api/propositionCalculations';

import { mapAlerts } from 'shared/lib/normalizers/mapAlerts';
import { mapOrderInfo } from 'shared/lib/normalizers/mapOrderInfo';
import { mapPropositionsResultsResponse } from 'shared/lib/normalizers/mapPropositionsResultsResponse';

import type { TGetOrderCalculations } from '../../types';

import { checkShouldShowForwardingPropositions } from './checkShouldShowForwardingPropositions';
import { mapOrderStatus } from './mapOrderStatus';

export const mapOrderCalculationsResponse = (data: PropositionCalculations.GetManyOrders): TGetOrderCalculations => {
  const forwardingPropositionsLength = data?.offers?.length ?? 0;
  const mappedOrderStatus = mapOrderStatus(
    data?.orderInfo?.orderStatus,
    !!data?.orderInfo?.isPriceChanged,
    !!data?.isCompleted,
    forwardingPropositionsLength,
  );
  const mappedOrderInfo = mapOrderInfo(data?.orderInfo);

  return {
    forwardingPropositions: mapPropositionsResultsResponse(data?.offers),
    order: mappedOrderInfo,

    orderStatus: mappedOrderStatus,
    isOrderCompleted: !!data?.isCompleted,

    // !!! в редьюсере пуллинга заказа shouldShowForwardingPropositions не обновится с тру на фолс
    // так как внутри одного расчета мы не должны менять это поле для заказов (даже для новых заказов созданных через пробросы)
    shouldShowForwardingPropositions: checkShouldShowForwardingPropositions(
      mappedOrderStatus,
      mappedOrderInfo?.searchPrice,
      mappedOrderInfo?.price,
    ),

    alerts: mapAlerts(data?.alerts),
  };
};
