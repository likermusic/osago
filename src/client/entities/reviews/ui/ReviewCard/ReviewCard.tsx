import { Avatar, Card, Rate, Space, Typography } from '@sravni/react-design-system';

import type { LandingReviewItem } from 'commonTypes/insuranceCompanies';

import styles from './ReviewCard.module.scss';
import { ReviewCardTexts } from './ReviewCard.texts';

const { Heading, Link, Text } = Typography;

export const ReviewCard = (props: LandingReviewItem) => {
  const { city, name, companyName, companyLogoLink, title, comment, rating = 0, reviewLink } = props;

  return (
    <Card
      size={16}
      className={styles.reviewWrapper}
    >
      <Space
        direction="vertical"
        size={16}
      >
        <Space size={16}>
          <Avatar
            size={44}
            src={companyLogoLink}
          />

          <Space
            direction="vertical"
            size={8}
            justify="center"
          >
            <Heading level={5}>{companyName}</Heading>

            <Space
              align="center"
              size={8}
            >
              <Rate
                count={1}
                value={rating}
                size={16}
              />
              <Text>{rating.toFixed(1)}</Text>
            </Space>
          </Space>
        </Space>

        <Space
          direction="vertical"
          size={8}
          align="start"
          justify="space-between"
        >
          <Heading
            level={5}
            className={styles.clampText}
          >
            {title}
          </Heading>

          <Text
            size={14}
            className={styles.comment}
          >
            <span className={styles.clampText}>{comment} </span>

            <Link
              href={reviewLink}
              target="_blank"
              rel="noreferrer"
            >
              {ReviewCardTexts.linkRead}
            </Link>
          </Text>

          <Text
            size={14}
            className="h-color-D60"
          >
            {name}, {city}
          </Text>
        </Space>
      </Space>
    </Card>
  );
};
