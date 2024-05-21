import type { ReactNode } from 'react';

import type { TSaleType } from 'shared/lib/sendGAEvents/events';
import type {
  ICompanyPropositionInfo,
  IOfferTag,
  IOrderProposition,
  TOrderPropositionStatus,
  TPropositionDetail,
} from 'shared/types';
import type { IDetailAlert } from 'shared/types/IAlert';

import type { IPropositionCardMain } from 'entities/propositionCalculations';

export interface IPropositionDetail {
  description: Nullable<TPropositionDetail>;
}

export type IPropositionOrder = Omit<IPropositionCardMain, 'absoluteTags'> &
  IPropositionDetail & {
    absoluteTags: IOfferTag[];
    orderPropositionStatus: TOrderPropositionStatus;
    price: Nullable<number>;
    searchPrice: Nullable<number>;
    paymentUrl: Nullable<string>;
    orderHash: Nullable<string>;
    calcHash: Nullable<string>;
    productId: Nullable<number>;
    company: ICompanyPropositionInfo;
    positionIndex: number;
    hasTimeLine?: boolean;
    alerts: IDetailAlert[];
    actionChildren: ReactNode;
    startDate: Nullable<string>;
  };

export type IPropositionOrderInfo = Omit<
  IPropositionOrder,
  | 'actionChildren'
  | 'headerActionChildren'
  // переопределяем тип компании на Nullable<ICompany>
  | 'company'
> & {
  company: Nullable<ICompanyPropositionInfo>;
  saleType: TSaleType;
  draftFullUrl: Nullable<string>;
};

export interface IOrderActionTypes
  extends Pick<
    IOrderProposition,
    'draftFullUrl' | 'price' | 'description' | 'paymentUrl' | 'isSectionSponsor' | 'isProlongation' | 'orderHash'
  > {
  isOrderReady: boolean;
  company: ICompanyPropositionInfo;
  positionIndex: number;
  saleType: TSaleType;
  isDetailInfoOpened: boolean;
  onToggleDetailInfoPopup: (newState: boolean) => void;
  startDate?: Nullable<string>;
}

export type IPropositionReadyToOrder = Omit<
  IPropositionCardMain,
  'absoluteTags' | 'actionChildren' | 'classNameContainer' | 'alertsActionChildren' | 'company'
> &
  IPropositionDetail & {
    absoluteTags: IOfferTag[];
    company: ICompanyPropositionInfo;
    isOrderInListExist: boolean;
    positionIndex: number;
    alerts: IDetailAlert[];
    handleStartNewOrder: () => void;
    buttonTitle: string;
  };
