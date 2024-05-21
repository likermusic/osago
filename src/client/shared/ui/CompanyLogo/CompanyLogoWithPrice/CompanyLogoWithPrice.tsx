import { Avatar, Space, Typography } from '@sravni/react-design-system';
import React from 'react';

import { formatPrice } from 'shared/lib/formatters';

type ICompanyLogoProps = {
  price: Nullable<number>;
  subtitle: string;
  companyIconUrl: string;
};

export const CompanyLogoWithPrice: FC<ICompanyLogoProps> = ({ className, price, companyIconUrl, subtitle }) => (
  <Space
    size={12}
    className={className}
    align="center"
  >
    <Avatar
      size={44}
      src={companyIconUrl}
    />

    <Space direction="vertical">
      {!!price && <Typography.Heading level={3}>{formatPrice(price)}</Typography.Heading>}

      <Typography.Text
        size={12}
        className="h-color-D30"
      >
        {subtitle}
      </Typography.Text>
    </Space>
  </Space>
);
