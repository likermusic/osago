import React from 'react';

import type { IOfferTag } from 'shared/types';
import type { IBonus } from 'shared/types/BonusesDescription';
import { OfferTag } from 'shared/ui';

import { CustomTooltipWithHide } from '../CustomTooltipWithHide/CustomTooltipWithHide';

interface ISmartTag extends IOfferTag {
  bonuses: IBonus[];
}

export const SmartTag: FC<ISmartTag> = ({ type, ...props }) =>
  type === 'PromoWithDetails' ? (
    <CustomTooltipWithHide
      type={type}
      {...props}
    />
  ) : (
    <OfferTag
      type={type}
      {...props}
    />
  );
