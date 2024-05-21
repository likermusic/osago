import { Space, Typography } from '@sravni/react-design-system';
import React from 'react';

import type { IAboutDescription } from 'shared/types';

export const AboutCompanyDescription: FC<IAboutDescription> = ({ aboutCompany, className }) => (
  <Space
    className={className}
    size={16}
    direction="vertical"
  >
    {aboutCompany.map(({ title, description }) => (
      <Space
        justify="space-between"
        key={title}
      >
        <Typography.Text>{title}</Typography.Text>
        <Typography.Text strong>{description}</Typography.Text>
      </Space>
    ))}
  </Space>
);
