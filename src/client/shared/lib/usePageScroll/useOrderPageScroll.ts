import { useCallback } from 'react';

import { useScrollIntoView } from '../useScrollIntoView';

import { ACTIVE_ORDER_ID } from './config';

export const useOrderPageScroll = () => {
  const { scrollElementIntoView: scrollToActiveOrder, htmlId: activeOrderId } = useScrollIntoView(ACTIVE_ORDER_ID);

  const navigateToActiveOrder = useCallback(() => {
    /**
     * Отступ рассчитываем в зависимости от высоты экрана.
     * На старых браузерах innerHeight пустой, поэтому там по дефолту будет смещение на 150
     * */
    const offset = -(window.innerHeight ? window.innerHeight / 4 : 150);

    scrollToActiveOrder({
      offset,
    });
  }, [scrollToActiveOrder]);

  return {
    activeOrderId,
    navigateToActiveOrder,
  };
};
