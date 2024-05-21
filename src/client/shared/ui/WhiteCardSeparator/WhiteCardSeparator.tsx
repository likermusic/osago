import cn from 'classnames';
import React from 'react';

import styles from './WhiteCardSeparator.module.scss';

export const WhiteCardSeparator: FC = ({ className }) => (
  <div className={cn(styles.wrapper, styles.container, className)} />
);
