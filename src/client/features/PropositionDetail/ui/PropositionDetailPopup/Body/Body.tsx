import { Accordion, Alert, Space, Typography } from '@sravni/react-design-system';

import { useAppSelector } from 'shared/lib/redux';
import { sendInsuranceInfoClick } from 'shared/lib/sendGAEvents';

import { BonusesDescription } from 'entities/bonus';
import { isWLSelector } from 'entities/whiteLabels';

import { AboutCompanyDescription } from './AboutCompanyDescription';
import { Alerts } from './Alerts';
import { BodyTexts } from './Body.texts';
import type { IBody } from './Body.types';
import { PriceDescription } from './PriceDescription';
import { ReviewsAndRatingsDescription } from './ReviewsAndRatingsDescription';

const sendInsuranceInfoClickScope = sendInsuranceInfoClick();

export const Body: FC<IBody> = ({ description, className }) => {
  const isWL = useAppSelector(isWLSelector);

  return (
    <Space
      className={className}
      direction="vertical"
      size={16}
    >
      {description.detailAlerts.length > 0 && (
        <Alerts
          bonuses={description.bonuses}
          detailAlerts={description.detailAlerts}
        />
      )}

      <Accordion
        defaultIndex={[0]}
        padding={false}
        onChange={() => {
          sendInsuranceInfoClickScope({ type: 'Reviews' });
        }}
      >
        <Accordion.Item
          title={BodyTexts.tabs.reviews.title}
          subtitle={isWL ? undefined : BodyTexts.tabs.reviews.subtitle}
        >
          <ReviewsAndRatingsDescription
            ratings={description.ratings}
            reviews={description.reviews}
          />
        </Accordion.Item>
      </Accordion>

      <Alert color="green">{description.description}</Alert>

      <Accordion
        padding={false}
        separator="divider"
        onChange={(openAccordionItems: number[]) => {
          openAccordionItems.includes(0) && sendInsuranceInfoClickScope({ type: 'PriceDetails' });
          openAccordionItems.includes(1) && sendInsuranceInfoClickScope({ type: 'Promo' });
          openAccordionItems.includes(2) && sendInsuranceInfoClickScope({ type: 'About' });
          openAccordionItems.includes(3) && sendInsuranceInfoClickScope({ type: 'Offices' });
        }}
      >
        <Accordion.Item
          title={BodyTexts.tabs.price.title}
          subtitle={BodyTexts.tabs.price.subtitle}
        >
          <PriceDescription {...description.price} />
        </Accordion.Item>

        {!!description.bonuses.length && (
          <Accordion.Item
            title={BodyTexts.tabs.bonuses.title}
            subtitle={BodyTexts.tabs.bonuses.subtitle}
          >
            <BonusesDescription bonuses={description.bonuses} />
          </Accordion.Item>
        )}

        <Accordion.Item
          title={BodyTexts.tabs.about.title}
          subtitle={BodyTexts.tabs.about.subtitle}
        >
          <AboutCompanyDescription aboutCompany={description.aboutCompany} />
        </Accordion.Item>

        <Accordion.Item
          title={BodyTexts.tabs.offices.title}
          subtitle={BodyTexts.tabs.offices.subtitle}
        >
          <Typography.Text>{BodyTexts.officesInfo}</Typography.Text>
        </Accordion.Item>
      </Accordion>
    </Space>
  );
};
