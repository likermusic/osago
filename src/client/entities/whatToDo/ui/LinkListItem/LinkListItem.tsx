import { Icon, Space } from '@sravni/react-design-system';
import React from 'react';

interface ILinkListItem {
  icon: React.ReactElement;
}

export const LinkListItem: FC<ILinkListItem> = ({ icon, children }) => (
  <Space size={12}>
    <Icon
      icon={icon}
      color="gray"
    />
    {children}
  </Space>
);
