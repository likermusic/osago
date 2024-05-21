import { Card, Skeleton, Space, Typography } from '@sravni/react-design-system';
import { useIsMobile } from '@sravni/react-utils';

import { formatPrice } from 'shared/lib/formatters';

import { PriceBlockTexts } from './PriceBlock.texts';

export interface IPriceBlock {
  isDataChangedOnSummary: boolean;
  isPriceLoading: boolean;
  price: Nullable<number>;
}

export const PriceBlock: FC<IPriceBlock> = ({ className, isDataChangedOnSummary, isPriceLoading, price }) => {
  const isMobile = useIsMobile();

  const formattedPrice = price && !isDataChangedOnSummary ? formatPrice(price) : null;

  return (
    <Card
      className={className}
      size={16}
    >
      <Space
        justify="space-between"
        align="center"
      >
        <Typography.Heading
          level={4}
          className="h-mr-12"
        >
          {PriceBlockTexts.priceTitle}
        </Typography.Heading>
        <Typography.Text
          className="h-text-right"
          size={isMobile ? 12 : 14}
        >
          {isDataChangedOnSummary && PriceBlockTexts.priceWhenDataChanged}
        </Typography.Text>

        {isPriceLoading ? (
          <Skeleton className="h-ml-16">
            <Skeleton.Paragraph />
          </Skeleton>
        ) : (
          formattedPrice && <Typography.Heading level={4}>{formattedPrice}</Typography.Heading>
        )}
      </Space>
    </Card>
  );
};
