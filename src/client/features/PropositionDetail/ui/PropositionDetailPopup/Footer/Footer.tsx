import { Space, Typography } from '@sravni/react-design-system';
import { useIsMobile } from '@sravni/react-utils';
import React from 'react';

import { formatPrice } from 'shared/lib/formatters';

interface IFooter {
  price: number;
}

export const Footer: FC<IFooter> = ({ children, className, price }) => {
  const isMobile = useIsMobile();

  return (
    <Space
      className={className}
      justify="space-between"
      align="center"
    >
      <Typography.Heading level={isMobile ? 2 : 3}>{formatPrice(price)}</Typography.Heading>
      {children}
    </Space>
  );
};
