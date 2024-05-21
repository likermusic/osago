import React from 'react';

import { getIconTagFromType } from '../../lib/getIconTagFromType/getIconTagFromType';
import type { IOfferTag } from '../../types';
import { TooltipBadge } from '../TooltipBadge';

export const OfferTag: FC<IOfferTag> = ({ type, ...props }) => (
  <TooltipBadge
    {...getIconTagFromType(type)}
    {...props}
  />
);
