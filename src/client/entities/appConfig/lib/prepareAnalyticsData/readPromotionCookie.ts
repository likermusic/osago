import { parsePromotionCookie } from '@sravni/utils/lib/analytics';

export const readPromotionCookie = (cookieValue?: string) => {
  const promotion = parsePromotionCookie(cookieValue || '');

  return {
    source: promotion.int_source || '',
    campaign: promotion.int_campaign || '',
    category: promotion.int_medium || '',
    sub1: promotion.int_content || '',
    sub2: promotion.int_term || '',
  };
};
