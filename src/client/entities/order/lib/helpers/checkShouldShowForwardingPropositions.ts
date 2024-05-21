import { SHOULD_SHOW_FORWARDING_ARRAY } from '../../constants';
import type { TOrderStatus } from '../../types';

export const checkShouldShowForwardingPropositions = (
  mappedOrderStatus: TOrderStatus,
  searchPrice: Nullable<number | undefined>,
  price: Nullable<number | undefined>,
): boolean =>
  SHOULD_SHOW_FORWARDING_ARRAY.includes(mappedOrderStatus) &&
  // показываем пробросы только когда цена увеличилась в большую сторону
  (mappedOrderStatus !== 'priceChanged' || (!!price && !!searchPrice && price > searchPrice));
