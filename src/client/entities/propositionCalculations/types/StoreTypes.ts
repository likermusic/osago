import type { ICalculationProposition, IOrderProposition } from 'shared/types';
import type { IDetailAlert } from 'shared/types/IAlert';

import type { TSortProposition } from './UITypes';

export interface IDriverWithKbm {
  kbm: Nullable<number>;
  fullName: string;
}

export interface IShortProposition {
  logoLink: string;
  companyId: number;
  companyName: string;
  id: string;
}

export interface ITransformedGetOrderHash {
  orderHash: Nullable<string>;
  /*
   * уникальный хеш заказа
   * создается через nanoId, чтобы перезапускать заказ если бек вернул тот же orderHash например при рестарте расчета или отказе от аппсейла
   */
  orderUniqueHash: Nullable<string>;
  propositionStatus?: 'error';
}

export interface ITransformedGetCalculationHash {
  calculationHash: Nullable<string>;
  propositionStatus?: 'error';
  isShowPromoField: boolean;
}

export type TOrderStatus =
  | 'initial'
  | 'loading'
  | 'success'
  | 'error'
  | 'priceChanged'
  | 'dateChanged'
  | 'priceAndDateChanged'
  | 'rejected'
  | 'allRejected';

export type TCalculationStatus = 'loading' | 'success' | 'error' | 'initial' | 'empty' | 'stoppedByOrder';

export interface PropositionCalculationsState {
  calculationHash: Nullable<string>;
  propositions: ICalculationProposition[];
  orderInfo: Nullable<IOrderProposition>;
  sort: TSortProposition;

  propositionStatus: TCalculationStatus;

  driversWithKbm: IDriverWithKbm[];
  multiDriveWithKbm?: number;
  isShowPromoField: boolean;

  promocodeAlerts: IDetailAlert[];
  promocode: Nullable<string>;

  alerts: IDetailAlert[];
}

export type ITransformedGetMultiCalculations = Pick<
  PropositionCalculationsState,
  | 'propositions'
  | 'propositionStatus'
  | 'orderInfo'
  | 'driversWithKbm'
  | 'multiDriveWithKbm'
  | 'promocodeAlerts'
  | 'alerts'
>;
