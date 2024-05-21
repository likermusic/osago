import type { IKbmDiscountDriver } from '../types';

export const getMinKbm = (drivers: IKbmDiscountDriver[]) => Math.min(...drivers.map(({ kbm }) => kbm), 10);
