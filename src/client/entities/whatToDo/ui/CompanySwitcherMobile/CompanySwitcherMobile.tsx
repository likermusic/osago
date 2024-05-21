import { Space, Tag } from '@sravni/react-design-system';
import cn from 'classnames';
import React from 'react';

import type { ICompanySwitcher } from '../CompanySwitcherDesktop';

import styles from './CompanySwitcherMobile.module.scss';

export const CompanySwitcherMobile: FC<ICompanySwitcher> = ({ companies, activeIndex, setActiveIndex, className }) => (
  <Space
    size={12}
    className={cn(className, styles.overflowSpace)}
    justify="space-between"
  >
    {companies.map(({ name }, idx) => (
      <Tag
        key={name}
        active={activeIndex === idx}
        onClick={() => setActiveIndex(idx)}
      >
        {name}
      </Tag>
    ))}
  </Space>
);
