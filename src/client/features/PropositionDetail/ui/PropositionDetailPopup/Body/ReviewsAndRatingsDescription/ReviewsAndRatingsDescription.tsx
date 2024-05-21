import { useIsMobile } from '@sravni/react-utils';
import React from 'react';

import type { IReviewDescription } from 'shared/types';

import { ReviewDescriptionDesktop } from './ReviewDescriptionDesktop';
import { ReviewDescriptionMobile } from './ReviewDescriptionMobile';

export const ReviewsAndRatingsDescription: FC<IReviewDescription> = (props) => {
  const isMobile = useIsMobile();
  const ComponentToRender = isMobile ? ReviewDescriptionMobile : ReviewDescriptionDesktop;
  return <ComponentToRender {...props} />;
};
