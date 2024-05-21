import { Icon, Tag } from '@sravni/react-design-system';
import React from 'react';

import { getIconTagFromType } from '../../lib/getIconTagFromType/getIconTagFromType';
import type { IOfferTag } from '../../types';
import { TooltipWithStopPropagation } from '../TooltipWithStopPropagation/TooltipWithStopPropagation';

type TBigOfferTag = Pick<IOfferTag, 'text' | 'type' | 'isTooltip'>;

export const BigOfferTag: FC<TBigOfferTag> = ({ className, text, type, isTooltip }) =>
  isTooltip ? (
    <TooltipWithStopPropagation
      className={className}
      content={text}
    >
      <Tag size={36}>
        <Icon
          color={getIconTagFromType(type)?.iconColor}
          icon={getIconTagFromType(type)?.icon}
        />
      </Tag>
    </TooltipWithStopPropagation>
  ) : (
    <Tag
      className={className}
      size={36}
    >
      <Icon
        color={getIconTagFromType(type)?.iconColor}
        icon={getIconTagFromType(type)?.icon}
      />
      {text}
    </Tag>
  );
