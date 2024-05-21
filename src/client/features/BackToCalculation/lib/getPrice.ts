import { formatPrice } from 'shared/lib/formatters/formatPrice';

export const getPrice = (price: number): string => (price ? `от ${formatPrice(price)}` : '');
