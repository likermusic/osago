import type { IBonus, IBonusesDescription } from 'shared/types/BonusesDescription';
import type { IDetailAlert } from 'shared/types/IAlert';

export type TAlertType = 'sravniAward';

export interface IAlerts {
  bonuses: IBonus[];
  detailAlerts: IDetailAlert[];
}

export interface ILabeledDescription {
  description: string;
  labels: string[];
  title: string;
}

export interface IDescriptionWithValue extends ILabeledDescription {
  value: string;
}

type TStarRating = { count: number; ratingValue: number };
export type TStarRatings = [TStarRating, TStarRating, TStarRating, TStarRating, TStarRating];

export interface IReviewDescription {
  ratings: IDescriptionWithValue[];
  reviews: {
    starRatings?: TStarRatings;
    positiveTag?: ILabeledDescription;
    negativeTag?: ILabeledDescription;
  };
}

type TFormula = {
  multipliers?: string[];
  resultText?: string;
};

interface ICoeff extends ILabeledDescription {
  color: 'white' | 'orange';
  value: string;
}

export interface IPrice {
  all: number;
  formula?: TFormula;
  osagoCoefficients?: ICoeff[];
  priceTitle?: string;
}

interface IAboutDescriptionElement {
  description: string;
  title: string;
}

export interface IAboutDescription {
  aboutCompany: IAboutDescriptionElement[];
}

export type TPropositionDetail = Omit<IAlerts, 'bonuses'> &
  IReviewDescription &
  IAboutDescription &
  IBonusesDescription & {
    description: string;
    price: IPrice;
  };
