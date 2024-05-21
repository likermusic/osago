import { Button, Carousel, Typography } from '@sravni/react-design-system';
import { useIsMobile } from '@sravni/react-utils';
import { identity } from 'lodash/fp';

import { useAppSelector } from 'shared/lib/redux';

import { reviewsSelector } from 'entities/reviews';

import { ReviewCard } from '../ReviewCard';

import styles from './LandingReviews.module.scss';
import { LandingReviewsTexts } from './LandingReviews.texts';

export const LandingReviews = () => {
  const isMobile = useIsMobile();
  const reviews = useAppSelector(reviewsSelector);
  if (!reviews) return null;

  return (
    <>
      <Carousel
        className="h-mb-16"
        title={<Typography.Heading level={isMobile ? 2 : 3}>{LandingReviewsTexts.caption}</Typography.Heading>}
      >
        {reviews.map((review) => (
          <ReviewCard
            {...review}
            key={review.reviewLink}
          />
        ))}
      </Carousel>

      <Button
        className={styles.button}
        variant="text"
        onClick={identity}
        size={36}
      >
        <Typography.Link
          href={LandingReviewsTexts.linkAllReviews.href}
          target="_blank"
        >
          {LandingReviewsTexts.linkAllReviews.text}
        </Typography.Link>
      </Button>
    </>
  );
};
