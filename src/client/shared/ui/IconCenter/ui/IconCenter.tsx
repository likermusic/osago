import { Icon } from '@sravni/react-design-system';
import type { IconProps } from '@sravni/react-design-system/lib/Icon';
import cn from 'classnames';
import React from 'react';

import styles from './IconCenter.module.scss';

export const IconCenter: FC<IconProps> = ({ children, className, ...props }) => (
  <Icon
    className={cn(className, styles.icon)}
    {...props}
  >
    {children}
  </Icon>
);
