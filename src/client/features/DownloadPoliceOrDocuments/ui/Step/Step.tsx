import { Icon, Space, Typography } from '@sravni/react-design-system';
import React from 'react';

const { Text } = Typography;

interface IStep {
  title: string;
  subtitle: string;
}

export const Step: FC<IStep> = ({ title, subtitle, className, children }) => (
  <Space
    size={12}
    className={className}
  >
    <Icon
      color="gray"
      size={20}
    >
      {children}
    </Icon>
    <Space direction="vertical">
      <Text
        size={16}
        strong
      >
        {title}
      </Text>
      <Text
        size={12}
        className="h-color-D60 h-mt-2"
      >
        {subtitle}
      </Text>
    </Space>
  </Space>
);
