import { useEffect, useState } from 'react';

import { convertToNumber } from 'shared/lib/convertToNumber/convertToNumber';
import { isArrayIncreaseFirstTimeByNumber } from 'shared/lib/isArrayIncreaseFirstTimeByNumber';
import { useAppSelector } from 'shared/lib/redux';
import { useGetSendAnalytics } from 'shared/lib/sendAnalyticsEvents';
import { sendEventOrderResult, sendEventShowPaymentLink } from 'shared/lib/sendGAEvents';
import type { TSendEventProlongationForwardingResultLabel } from 'shared/lib/sendGAEvents/events';
import type { TEventNames } from 'shared/types/TEventNames';

import type { TOrderStatus } from 'entities/order';
import { orderSelector, orderStatusSelector } from 'entities/order';

const MAP_ORDER_STATUS_FRONT_EVENTS: Record<
  TOrderStatus,
  TSendEventProlongationForwardingResultLabel | TSendEventProlongationForwardingResultLabel[] | null
> = {
  priceChanged: 'СК изменила цену',
  dateChanged: 'СК изменила срок',
  rejected: 'СК не отвечает',
  allRejected: 'Все СК не отвечают',
  priceAndDateChanged: ['СК изменила срок', 'СК изменила цену'],
  initial: null,
  loading: null,
  success: null,
  error: 'Ошибка не бэке',
};

const MAP_ORDER_STATUS_BACK_EVENTS: Record<TOrderStatus, TEventNames | TEventNames[] | null> = {
  priceChanged: ['osago_order_main_sk_price_changed'],
  dateChanged: ['osago_order_main_sk_data_changed'],
  rejected: ['osago_order_main_sk_refuse'],
  allRejected: ['osago_order_main_sk_refuse', 'osago_empty_result_on_orders'],
  priceAndDateChanged: ['osago_order_main_sk_price_changed', 'osago_order_main_sk_data_changed'],
  initial: null,
  loading: 'osago_order_start',
  success: ['osago_order_main_sk_approve'],
  error: null,
};

const sendEvents = <T>(sendEvent: (event: T) => void, status: T | T[] | null) => {
  if (!status) return;
  Array.isArray(status) ? status.forEach((event) => sendEvent(event)) : sendEvent(status);
};

/*
 * TODO: добавить фронтовую аналитику https://sravni-corp.atlassian.net/browse/OS-7657
 * при добавлении фронтовой аналитики посмотреть https://github.com/sravni/osagoinsurance-frontend/blob/713cad538af25c1557ea4380af4ca71452808900/src/client/widgets/Propositions/lib/useSendEventForwardingProposition.ts
 */
export const useSendEventOrder = () => {
  const orderStatus = useAppSelector(orderStatusSelector);
  const { order, forwardingPropositions, shouldShowForwardingPropositions, isOrderCompleted } =
    useAppSelector(orderSelector);
  const { isProlongation, company, paymentUrl, price, searchPrice } = order || {};

  const [previousPropositionsLength, setPreviousPropositionsLength] = useState<number>(0);

  const sendAnalyticsEvent = useGetSendAnalytics();

  const payloadSuccessPropositionsLength = convertToNumber(forwardingPropositions?.length);

  useEffect(() => {
    const eventStatusFront = MAP_ORDER_STATUS_FRONT_EVENTS[orderStatus];
    const eventStatusBack = MAP_ORDER_STATUS_BACK_EVENTS[orderStatus];

    sendEvents(sendEventOrderResult, eventStatusFront);

    sendEvents(sendAnalyticsEvent, eventStatusBack);
  }, [orderStatus, sendAnalyticsEvent]);

  useEffect(() => {
    if (shouldShowForwardingPropositions) {
      const isSuccessIncreaseFirstTimeByNumber = isArrayIncreaseFirstTimeByNumber(
        previousPropositionsLength,
        payloadSuccessPropositionsLength,
      );

      if (isSuccessIncreaseFirstTimeByNumber(1)) {
        sendAnalyticsEvent('osago_order_first1_ic');
      }

      if (isSuccessIncreaseFirstTimeByNumber(3)) {
        sendAnalyticsEvent('osago_order_first3_ic');
      }
    }
  }, [
    payloadSuccessPropositionsLength,
    shouldShowForwardingPropositions,
    sendAnalyticsEvent,
    previousPropositionsLength,
  ]);

  useEffect(() => {
    if (isProlongation) {
      sendEventOrderResult('Пролонгация');
    }
  }, [isProlongation]);

  useEffect(() => {
    if (paymentUrl && price) {
      sendAnalyticsEvent('osago_order_user_has_awaited_payment_link');
      sendEventShowPaymentLink({
        priceWasChanged: price !== searchPrice,
        companyName: String(company?.companyName),
        price,
        saleType: 'Напрямую',
      });
    }
  }, [company?.companyName, paymentUrl, price, searchPrice, sendAnalyticsEvent]);

  useEffect(() => {
    if (isOrderCompleted) sendAnalyticsEvent('osago_order_complete');
  }, [isOrderCompleted, sendAnalyticsEvent]);

  useEffect(() => {
    setPreviousPropositionsLength(forwardingPropositions?.length ?? 0);
  }, [forwardingPropositions?.length]);
};
