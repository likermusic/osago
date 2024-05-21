import { Button, Icon } from '@sravni/react-design-system';
import { Tip } from '@sravni/react-icons';
import cn from 'classnames';
import React from 'react';

import styles from './InfoButton.module.scss';

interface IInfoButton {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isDisabled?: boolean;
}

export const InfoButton: FC<IInfoButton> = ({ className, onClick, isDisabled }) => (
  <Button
    className={cn(styles.btn, className)}
    onClick={onClick}
    disabled={isDisabled}
    variant="secondary"
  >
    <Icon icon={<Tip />} />
  </Button>
);
