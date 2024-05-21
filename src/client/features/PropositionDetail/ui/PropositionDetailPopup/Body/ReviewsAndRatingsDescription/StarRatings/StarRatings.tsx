import { Rate, Space, Typography } from '@sravni/react-design-system';
import React from 'react';

import type { TStarRatings } from 'shared/types';

interface IStarRatings {
  marksCounts: TStarRatings;
}

export const StarRatings: FC<IStarRatings> = ({ marksCounts, className }) => (
  <Space
    className={className}
    direction="vertical"
    size={4}
  >
    {marksCounts?.map(({ count, ratingValue }) => (
      <Space
        justify="space-between"
        key={ratingValue}
      >
        <Rate
          count={ratingValue}
          value={ratingValue}
          disabled
        />
        <Typography.Heading level={6}>{count}</Typography.Heading>
      </Space>
    ))}
  </Space>
);
