import { Space, Typography } from '@sravni/react-design-system';
import type { ReactNode } from 'react';
import React from 'react';

import styles from './PageHeader.module.scss';

const { Heading, Text } = Typography;

interface IPageHeader {
  title: string;
  subtitle?: string;
  icon: ReactNode;
}

export const PageHeader: FC<IPageHeader> = ({ className, title, icon, subtitle }) => (
  <Space
    align="center"
    justify="space-between"
    className={className}
  >
    <div>
      <Heading
        className={styles.textWrapper}
        level={3}
      >
        {title}
      </Heading>
      {subtitle && <Text className="h-mt-8 h-color-D60">{subtitle}</Text>}
    </div>

    <div className={`${styles.iconWrapper} h-pl-16`}>{icon}</div>
  </Space>
);
