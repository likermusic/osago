import { Avatar, Card, Skeleton, Space, Typography } from '@sravni/react-design-system';
import { useIsMobile } from '@sravni/react-utils';

import { useAppSelector } from 'shared/lib/redux';

import { policiesDraftsUrlsSelector, PoliciesDrafts } from 'entities/PolicyDraft';

import { AfterPaymentTexts } from './AfterPayment.texts';

export const AfterPayment: FC<{ isDraftsLoading: boolean }> = ({ className, isDraftsLoading }) => {
  const { upsaleRulesUrl } = useAppSelector(policiesDraftsUrlsSelector);
  const isMobile = useIsMobile();

  return (
    <Card className={className}>
      <Typography.Heading
        className="h-mb-24"
        level={4}
      >
        {AfterPaymentTexts.afterPaymentTitle}
      </Typography.Heading>
      <Space
        direction={isMobile ? 'vertical' : 'horizontal'}
        size={16}
      >
        {AfterPaymentTexts.steps.map((step, index) => (
          <Space
            key={step}
            align="center"
          >
            <Avatar
              color="gray"
              size={44}
              className="h-mr-12"
            >
              {index + 1}
            </Avatar>
            <Typography.Text
              className="h-color-D100"
              size={14}
            >
              {step}
            </Typography.Text>
          </Space>
        ))}
      </Space>

      {isDraftsLoading ? (
        <Skeleton>
          <Skeleton.Paragraph className="h-mt-24 h-mb-12" />
        </Skeleton>
      ) : (
        <PoliciesDrafts className="h-mt-24" />
      )}

      <Typography.Text
        size={14}
        className="h-color-D30 h-pl-8"
      >
        {AfterPaymentTexts.insuranceRules.text}
        <Typography.Link
          href={AfterPaymentTexts.insuranceRules.href}
          target="_blank"
          color="blue"
        >
          {AfterPaymentTexts.insuranceRules.link}
        </Typography.Link>
        {upsaleRulesUrl && (
          <>
            {AfterPaymentTexts.insuranceRules.renessansText}
            <Typography.Link
              href={upsaleRulesUrl}
              target="_blank"
              color="blue"
            >
              {AfterPaymentTexts.insuranceRules.renessansRulesText}
            </Typography.Link>
          </>
        )}
      </Typography.Text>
    </Card>
  );
};
