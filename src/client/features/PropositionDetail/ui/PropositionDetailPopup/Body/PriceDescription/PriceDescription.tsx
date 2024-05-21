import { Space, Typography } from '@sravni/react-design-system';
import { useIsMobile } from '@sravni/react-utils';
import React from 'react';

import { formatPrice } from 'shared/lib/formatters/formatPrice';
import type { IPrice } from 'shared/types';
import { CostDetails } from 'shared/ui/CostDetails';
import { DeviceSizedCard } from 'shared/ui/DeviceSizedCard';
import { WhiteCardSeparator } from 'shared/ui/WhiteCardSeparator';

import { DescriptionElementWithValue } from '../DescriptionElement';

import styles from './PriceDescription.module.scss';
import { PriceDescriptionTexts } from './PriceDescription.texts';

export const PriceDescription: FC<IPrice> = ({ all, osagoCoefficients, priceTitle, formula, className }) => {
  const isMobile = useIsMobile();

  return (
    <div className={className}>
      <Typography.Text className="h-mb-16">{PriceDescriptionTexts.preface}</Typography.Text>

      {formula && (
        <CostDetails
          className="h-mb-16"
          formula={formula}
        />
      )}

      <DeviceSizedCard
        color="dark"
        vertical
      >
        <Space
          direction="vertical"
          size={isMobile ? 16 : 24}
        >
          {osagoCoefficients?.map((coeff) => (
            <DescriptionElementWithValue
              {...coeff}
              key={coeff.title}
            />
          ))}
        </Space>

        <WhiteCardSeparator className={styles.separatorMargin} />

        <Space justify="space-between">
          <Typography.Text
            size={16}
            strong
          >
            {priceTitle ?? PriceDescriptionTexts.all.title}
          </Typography.Text>
          <Typography.Heading level={4}>{formatPrice(all)}</Typography.Heading>
        </Space>
      </DeviceSizedCard>
    </div>
  );
};
