import { Space, Card } from '@sravni/react-design-system';
import cn from 'classnames';

import type { IReviewDescription } from 'shared/types';

import { DescriptionElement } from '../../DescriptionElement';
import { Ratings } from '../Ratings';
import { StarRatings } from '../StarRatings';

import styles from './ReviewDescriptionDesktop.module.scss';

export const ReviewDescriptionDesktop: FC<IReviewDescription> = ({ reviews, ratings, className }) => (
  <Space
    className={className}
    size={16}
    align="start"
    wrap
  >
    {reviews.starRatings && (
      <Card
        className={styles.starsBlock}
        color="dark"
      >
        <StarRatings marksCounts={reviews.starRatings} />
      </Card>
    )}

    {(reviews.positiveTag || reviews.negativeTag) && (
      <Card
        className={cn(styles.starsDescriptionBlock, styles.growCard)}
        color="dark"
      >
        <Space
          direction="vertical"
          size={16}
        >
          {reviews.positiveTag && <DescriptionElement {...reviews.positiveTag} />}
          {reviews.negativeTag && <DescriptionElement {...reviews.negativeTag} />}
        </Space>
      </Card>
    )}

    <Card
      color="dark"
      className={styles.growCard}
    >
      <Ratings ratings={ratings} />
    </Card>
  </Space>
);
