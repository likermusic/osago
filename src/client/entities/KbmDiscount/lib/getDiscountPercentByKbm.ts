export const getDiscountPercentByKbm = (kbm: number) => Math.round(Math.abs(kbm - 1) * 100);
