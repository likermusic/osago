import { Skeleton, Space } from '@sravni/react-design-system';
import cn from 'classnames';
import React from 'react';

import styles from './ProlongationSkeleton.module.scss';

export const ProlongationSkeleton: FC = ({ className }) => (
  <Skeleton className={cn(styles.skeleton, className)}>
    <Space
      direction="vertical"
      size={16}
    >
      <Space size={12}>
        <Skeleton.Avatar inverted />
        <Space
          direction="vertical"
          size={2}
        >
          <Skeleton.Paragraph
            inverted
            width={60}
          />
          <Skeleton.Paragraph
            inverted
            width={60}
          />
        </Space>
      </Space>
      <Space
        direction="vertical"
        size={2}
      >
        <Skeleton.Paragraph
          inverted
          width={80}
        />
        <Skeleton.Paragraph
          inverted
          width={40}
        />
      </Space>
    </Space>
    <Skeleton.Button inverted />
  </Skeleton>
);
