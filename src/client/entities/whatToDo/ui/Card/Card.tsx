import { Card as DesignCard, Space, Typography } from '@sravni/react-design-system';
import React from 'react';

import { IconCenter } from 'shared/ui/IconCenter';

import styles from './Card.module.scss';

const { Heading, Text } = Typography;

interface ICard {
  isMobile: boolean;
  stepNumber: number;
  title: string;
  subtitle: string;
}

export const Card: FC<ICard> = ({ isMobile, stepNumber, title, subtitle, children }) => (
  <DesignCard
    size={24}
    className={styles.wrapper}
  >
    <Space
      size={16}
      justify="space-between"
      align="center"
    >
      <Heading level={isMobile ? 3 : 5}>{title}</Heading>
      <IconCenter background="white">
        <Heading
          level={5}
          className="h-color-B100"
        >
          {stepNumber}
        </Heading>
      </IconCenter>
    </Space>

    <Text className="h-color-D60 h-mt-16">{subtitle}</Text>

    <div className="h-mt-16">{children}</div>
  </DesignCard>
);
