import { Badge, Space, Typography } from '@sravni/react-design-system';
import React from 'react';

import type { ILabeledDescription } from 'shared/types';

import styles from './DescriptionElement.module.scss';

export interface IDescriptionElement extends ILabeledDescription {
  color?: 'white' | 'orange';
}

export const DescriptionElement: FC<IDescriptionElement> = ({
  labels,
  description,
  title,
  children,
  className,
  color = 'white',
}) => (
  <Space
    justify="space-between"
    size={12}
    className={className}
  >
    <Space
      direction="vertical"
      size={2}
    >
      <Typography.Text strong>{title}</Typography.Text>
      <Typography.Text
        className="h-color-D60"
        size={12}
      >
        {description}
      </Typography.Text>
    </Space>
    <Space
      className={styles.badgeContainer}
      direction="vertical"
      align="end"
      size={8}
    >
      {children}
      {labels?.map((label) => (
        <Badge
          text={label}
          color={color}
          key={label}
        />
      ))}
    </Space>
  </Space>
);
