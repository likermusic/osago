import { Space } from '@sravni/react-design-system';
import React from 'react';

import type { IDescriptionWithValue } from 'shared/types';

import { DescriptionElementWithValue } from '../../DescriptionElement';

interface IRatings {
  ratings: IDescriptionWithValue[];
}

export const Ratings: FC<IRatings> = ({ ratings }) => (
  <Space
    direction="vertical"
    size={16}
  >
    {ratings?.map((rating) => (
      <DescriptionElementWithValue
        {...rating}
        key={rating.title}
      />
    ))}
  </Space>
);
