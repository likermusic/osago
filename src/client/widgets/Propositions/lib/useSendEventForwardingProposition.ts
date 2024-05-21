import { useEffect } from 'react';

import { convertToNumber } from 'shared/lib/convertToNumber/convertToNumber';
import { useAppSelector } from 'shared/lib/redux';
import { sendEventProlongationForwardingResult } from 'shared/lib/sendGAEvents';
import type { TSendEventProlongationForwardingResultLabel } from 'shared/lib/sendGAEvents/events';

import {
  forwardingPropositionsMappedByDateAndSortedSelector,
  isOrderCompletedSelector,
  isOrderProlongationSelector,
  orderStatusSelector,
} from 'entities/order';
import type { TOrderStatus } from 'entities/order';

const MAP_ORDER_STATUS: Record<
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

export const useSendEventForwardingProposition = (dates: string[]) => {
  const isOrderCompleted = useAppSelector(isOrderCompletedSelector);
  const orderStatus = useAppSelector(orderStatusSelector);
  const isOrderProlongation = useAppSelector(isOrderProlongationSelector);
  const forwardingPropositionsMappedByDate = useAppSelector(forwardingPropositionsMappedByDateAndSortedSelector);

  useEffect(() => {
    const eventStatus = MAP_ORDER_STATUS[orderStatus];
    if (isOrderCompleted && eventStatus) {
      const forwardingAmountInfo = dates.reduce(
        (acc, currentDate) =>
          `${acc && `${acc}|`}${currentDate}:${convertToNumber(
            forwardingPropositionsMappedByDate?.[currentDate]?.length,
          )}`,
        '',
      );

      Array.isArray(eventStatus)
        ? eventStatus.forEach((event) => sendEventProlongationForwardingResult(event, forwardingAmountInfo))
        : sendEventProlongationForwardingResult(eventStatus, forwardingAmountInfo);

      if (isOrderProlongation) {
        sendEventProlongationForwardingResult('Пролонгация', forwardingAmountInfo);
      }
    }
    // тригиримся только на isOrderCompleted
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOrderCompleted]);
};
