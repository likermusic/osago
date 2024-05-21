import { Space } from '@sravni/react-design-system';
import cn from 'classnames';
import React from 'react';

import type { IBonusesDescription } from 'shared/types/BonusesDescription';

import { BonusController } from './BonusController';
import styles from './BonusesDescription.module.scss';

export const BonusesDescription: FC<IBonusesDescription> = ({ bonuses, className }) =>
  bonuses.length > 0 ? (
    <Space
      size={12}
      className={cn(styles.cardContainer, className)}
    >
      {bonuses?.map((bonus) => (
        <BonusController
          {...bonus}
          key={bonus.name}
        />
      ))}
    </Space>
  ) : null;
