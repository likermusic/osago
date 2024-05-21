import { Space } from '@sravni/react-design-system';
import React from 'react';

import type { IReviewDescription } from 'shared/types';
import { DeviceSizedCard } from 'shared/ui/DeviceSizedCard';
import { WhiteCardSeparator } from 'shared/ui/WhiteCardSeparator';

import { DescriptionElement } from '../../DescriptionElement';
import { Ratings } from '../Ratings';
import { StarRatings } from '../StarRatings';

export const ReviewDescriptionMobile: FC<IReviewDescription> = ({
  reviews: { starRatings, positiveTag, negativeTag },
  ratings,
  className,
}) => (
  <div className={className}>
    <DeviceSizedCard
      color="dark"
      vertical
    >
      <Space
        direction="vertical"
        size={16}
      >
        {starRatings && <StarRatings marksCounts={starRatings} />}

        {starRatings && (positiveTag || negativeTag) && <WhiteCardSeparator />}

        {positiveTag && <DescriptionElement {...positiveTag} />}

        {negativeTag && <DescriptionElement {...negativeTag} />}
      </Space>
    </DeviceSizedCard>

    <DeviceSizedCard
      className="h-mt-16"
      color="dark"
      vertical
    >
      <Ratings ratings={ratings} />
    </DeviceSizedCard>
  </div>
);
