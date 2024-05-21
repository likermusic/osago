import { Card, Space, Typography, Button, Divider } from '@sravni/react-design-system';
import { useBoolean, useIsMobile } from '@sravni/react-utils';
import { useMemo } from 'react';

import { useAppSelector } from 'shared/lib/redux';

import { slicedRatingList } from 'entities/insuranceCompanies/lib/slicedRatingList';

import { LANDING_RATINGS_QUANTITY_SHORT } from '../../config';
import { insuranceCompaniesWithRatingsSelector } from '../../model/insuranceCompanies.selectors';
import { RatingHeader } from '../RatingHeader/RatingHeader';
import { RatingRow } from '../RatingRow/RatingRow';

import styles from './LandingCompaniesRating.module.scss';
import { LandingCompaniesRatingTests } from './LandingCompaniesRating.texts';

const { caption, showMore, hidden } = LandingCompaniesRatingTests;

export const LandingCompaniesRating = () => {
  const [isHidden, setIsHidden] = useBoolean(true);
  const isMobile = useIsMobile();

  const ratingsList = useAppSelector(insuranceCompaniesWithRatingsSelector);
  const sizeRatingList = useMemo(() => slicedRatingList(ratingsList, isHidden), [isHidden, ratingsList]);

  if (sizeRatingList.length === 0) {
    return null;
  }

  return (
    <Card className={styles.wrapper}>
      <Space
        direction="vertical"
        size={32}
      >
        <Typography.Heading level={isMobile ? 2 : 3}>{caption}</Typography.Heading>

        <Space
          direction="vertical"
          size={16}
        >
          <RatingHeader />

          <Divider />

          <Space
            size={32}
            direction="vertical"
          >
            {sizeRatingList.map(({ name, mobileLogoLink, clientRating, fullRating, reviewUrl }) => (
              <RatingRow
                key={name}
                name={name}
                icon={mobileLogoLink}
                rating={clientRating}
                reviewsCount={fullRating.reviewRating.reviewsCount}
                answersCount={fullRating.reviewRating.insuranceCompanyAnswersCount}
                solvedCount={fullRating.reviewRating.resolvedProblemsCount}
                companyRatingDetailsLink={reviewUrl}
              />
            ))}
          </Space>
        </Space>

        {ratingsList?.length > LANDING_RATINGS_QUANTITY_SHORT && (
          <Space>
            <Button
              className={styles.showMore}
              variant="text"
              color="blue"
              onClick={setIsHidden.toggle}
            >
              {isHidden ? showMore : hidden}
            </Button>
          </Space>
        )}
      </Space>
    </Card>
  );
};
