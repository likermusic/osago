import { Typography, Card } from '@sravni/react-design-system';
import { useIsMobile } from '@sravni/react-utils';
import cn from 'classnames';
import React from 'react';

import styles from './Economy.module.scss';

interface EconomyDesktopProps {
  title: string;
  description: string;
}

export const Economy: FC<EconomyDesktopProps> = ({ className, title, description, children }) => {
  const isMobile = useIsMobile();
  return (
    <Card className={cn(styles.card, className)}>
      <div className={styles.description}>
        <Typography.Heading
          className="h-color-D80"
          level={3}
        >
          {title}
        </Typography.Heading>

        <Typography.Text
          size={14}
          className={isMobile ? 'h-mt-8' : 'h-mt-16'}
        >
          {description}
        </Typography.Text>
      </div>

      {children}
    </Card>
  );
};
