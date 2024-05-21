import { formatPrice } from 'shared/lib/formatters';

export const getPaymentValue = (payment: number): string => `до ${formatPrice(payment)}`;
export const getDateValue = (date: string): string => `c ${date}`;
