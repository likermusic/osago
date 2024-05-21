import { Carousel, Typography, Card, Space } from '@sravni/react-design-system';
import { useIsMobile } from '@sravni/react-utils';

import { RateWithTitle } from 'shared/ui/RateWithTitle';

import type { TMarketingInfoReview } from '../../types';

import styles from './Reviews.module.scss';
import { ReviewsTexts } from './Reviews.texts';

export const Reviews: FC<{ reviews: TMarketingInfoReview[] }> = ({ reviews, className }) => {
  const isMobile = useIsMobile();

  return (
    <Carousel
      className={className}
      title={<Typography.Heading level={4}>{ReviewsTexts.title}</Typography.Heading>}
    >
      <Space
        justify="space-between"
        size={16}
      >
        {reviews.map((review) => (
          <Card
            className={styles.card}
            size={16}
            key={review.text}
          >
            <RateWithTitle
              value={review.rating}
              textProps={{ strong: true }}
              spaceProps={{ justify: 'space-between' }}
            >
              {review.name}
            </RateWithTitle>

            <Typography.Text size={isMobile ? 12 : 14}>{review.text}</Typography.Text>
          </Card>
        ))}
      </Space>
    </Carousel>
  );
};
