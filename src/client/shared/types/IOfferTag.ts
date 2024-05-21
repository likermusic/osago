import type {
  BadgeColor,
  BadgeVariant,
} from '@sravni/react-design-system/dist/types/components/Badge/types/Badge.types';
import type React from 'react';

type TOfferType =
  | 'SectionSponsor'
  | 'Promo'
  | 'InsuranceCompany'
  | 'StartDate'
  | 'UpSale'
  | 'RecommendedCompany'
  | 'CheapestCompany'
  | 'CashbackCalculation'
  | 'CashbackOrder'
  | 'None'
  | 'TimeLimitedCashbackCalculation'
  | 'TimeLimitedCashbackOrder'
  | 'SravniAward'
  | 'PromoWithDetails';

export interface IOfferTag {
  code?: string;
  footer?: React.ReactNode;
  color: BadgeColor;
  title: string | undefined;
  text: string | undefined;
  type: TOfferType;
  variant: BadgeVariant;
  isTooltip: boolean;
  width?: number;
}
