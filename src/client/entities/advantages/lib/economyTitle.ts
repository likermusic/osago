import { formatPrice } from 'shared/lib/formatters/formatPrice';

const MIN_PRICE = 800;
const MAX_PRICE = 5500;

export const economyTitle = `Экономия — от ${formatPrice(MIN_PRICE)} до ${formatPrice(MAX_PRICE)}`;
