import type { IStatuses } from './lib/driversKbmStatuses';

export interface IKbmDiscountDriver {
  fullName: string;
  isInsurer: boolean;
  kbm: number;
  isSelected: boolean;
  keyInDrivers: string;
}

export type TStatusesAndDrivers = [IStatuses, IKbmDiscountDriver[]];
