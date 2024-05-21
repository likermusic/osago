import { Skeleton, Space } from '@sravni/react-design-system';
import React from 'react';

import styles from './CardSkeleton.module.scss';

export const CardSkeleton = () => {
  const DotElement = (
    <Space
      align="center"
      size={12}
    >
      <Skeleton.Paragraph width={7} />
      <Space
        direction="vertical"
        size={2}
      >
        <Skeleton.Paragraph width={80} />
        <Skeleton.Paragraph width={50} />
      </Space>
    </Space>
  );

  return (
    <Skeleton className={styles.container}>
      <Space justify="space-between">
        <Space size={12}>
          <Skeleton.Avatar />
          <Space
            direction="vertical"
            size={2}
          >
            <Skeleton.Paragraph width={70} />
            <Skeleton.Paragraph />
          </Space>
        </Space>
        <Space
          direction="vertical"
          align="end"
          size={2}
        >
          <Skeleton.Paragraph width={40} />
          <Skeleton.Paragraph width={20} />
        </Space>
      </Space>

      <Skeleton.Button block />

      {DotElement}

      {DotElement}

      <Skeleton.Button block />
    </Skeleton>
  );
};
