import type { IKbmDiscountDriver } from '../types';

export const getMaxKbm = (drivers: IKbmDiscountDriver[]) => Math.max(...drivers.map(({ kbm }) => kbm), 0);
