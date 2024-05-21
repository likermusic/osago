export type TPromocodeStatus = 'input' | 'success' | 'loading' | 'invisible';
export type CheckPromoResult = { promoCode?: string; isActive: boolean; error?: string };
