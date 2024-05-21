import type { TSortProposition } from 'entities/propositionCalculations';

export const NEW_PROPOSTIONS_SORTING_MAP: Record<TSortProposition, string> = {
  priceASC: 'По возрастанию цены',
  priceDESC: 'По убыванию цены',
  bestSravniReviews: 'С лучшим рейтингом Сравни',
};
