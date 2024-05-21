import { useEffect } from 'react';

import type { PropositionCalculations } from 'commonTypes/api/propositionCalculations';
import { ORDER_MAX_POLLING_PERIOD, STANDARD_POLLING_PERIOD } from 'constants/pollingPeriod';

import { Polling } from 'shared/lib/Polling';
import { useAppDispatch, useAppSelector } from 'shared/lib/redux';
import { useGetSendAnalytics } from 'shared/lib/sendAnalyticsEvents';

import { orderHashSelector, orderUniqueHashSelector } from '../../model/order.selectors';
import {
  setActiveOrderToError,
  setIsOrderCompleted,
  setOrderCalculations,
  updateStoreWhenOrderPollingFinishedByTime,
} from '../../model/order.slice';
import { mapOrderCalculationsResponse } from '../helpers/mapOrderCalculationsResponse';

const orderPollingController = new Polling<PropositionCalculations.GetManyOrders>({
  maxPollingIntervalMs: ORDER_MAX_POLLING_PERIOD,
  pollingIntervalMs: STANDARD_POLLING_PERIOD,
  urlKey: 'getManyOrders',
});

export const useOrderPolling = () => {
  const orderHash = useAppSelector(orderHashSelector);
  const orderUniqueHash = useAppSelector(orderUniqueHashSelector);
  const dispatch = useAppDispatch();
  const sendAnalyticsEvent = useGetSendAnalytics();

  orderPollingController.setOnError(() => dispatch(setActiveOrderToError()));
  orderPollingController.setOnSuccess((data, isFinished) => {
    const mappedData = mapOrderCalculationsResponse(data);
    dispatch(setOrderCalculations(mappedData));

    if (mappedData.isOrderCompleted) {
      orderPollingController.stopPolling();
      dispatch(setIsOrderCompleted(true));
    }

    if (isFinished) {
      dispatch(setIsOrderCompleted(true));
      dispatch(updateStoreWhenOrderPollingFinishedByTime());
    }

    if (mappedData?.shouldShowForwardingPropositions && !mappedData?.isOrderCompleted)
      sendAnalyticsEvent('osago_contact_refuse');
  });

  useEffect(() => () => orderPollingController.stopPolling(), []);

  useEffect(() => {
    if (orderHash) {
      orderPollingController.startPolling({ orderHash });
    }

    // orderUniqueHash нужен, чтобы перезапускать пуллинг при отказе от апсейла или рестарте заказа по ошибке
  }, [orderHash, orderUniqueHash]);
};
