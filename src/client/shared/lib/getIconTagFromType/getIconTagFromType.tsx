import type { IconProps } from '@sravni/react-design-system/dist/types/components/Icon/types/Icon.types';
import { Gift, MoneyCoins, StarFilled } from '@sravni/react-icons';
import React from 'react';

import { SravniAwardIcon } from '../../assets/icons/SravniAwardIcon';
import type { IOfferTag } from '../../types/IOfferTag';

type TIcon = {
  icon: React.ReactNode;
  iconColor?: IconProps['color'];
};

const TAG_ICON_RECORD: Record<IOfferTag['type'], TIcon | null> = {
  SectionSponsor: { icon: <StarFilled /> },
  Promo: { icon: <Gift /> },
  InsuranceCompany: null,
  StartDate: null,
  UpSale: null,
  RecommendedCompany: null,
  CheapestCompany: null,
  CashbackCalculation: null,
  CashbackOrder: { icon: <MoneyCoins />, iconColor: 'green' },
  SravniAward: { icon: <SravniAwardIcon /> },
  TimeLimitedCashbackCalculation: null,
  TimeLimitedCashbackOrder: null,
  None: null,
  PromoWithDetails: { icon: <Gift /> },
};

export const getIconTagFromType = (type: IOfferTag['type']) => TAG_ICON_RECORD[type];
