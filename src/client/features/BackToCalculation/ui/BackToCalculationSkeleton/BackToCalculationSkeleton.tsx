import { Skeleton, Space } from '@sravni/react-design-system';
import { useIsMobile } from '@sravni/react-utils';
import cn from 'classnames';
import React from 'react';

import styles from './BackToCalculationSkeleton.module.scss';

export const BackToCalculationSkeleton: FC = ({ className }) => {
  const isMobile = useIsMobile();
  return (
    <Skeleton className={cn(styles.skeleton, 'h-cursor-pointer', className)}>
      <Space
        direction="vertical"
        size={2}
      >
        <Skeleton.Paragraph
          inverted={isMobile}
          width={80}
        />
        <Skeleton.Paragraph
          inverted={isMobile}
          width={100}
        />
      </Space>
    </Skeleton>
  );
};
