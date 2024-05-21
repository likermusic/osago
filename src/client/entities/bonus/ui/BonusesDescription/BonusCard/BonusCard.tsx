import { Typography } from '@sravni/react-design-system';
import cn from 'classnames';
import React from 'react';

import type { IBonus } from 'shared/types/BonusesDescription';
import { DeviceSizedCard } from 'shared/ui/DeviceSizedCard';

import { BonusesDescriptionTexts } from '../BonusesDescription.texts';

import { BONUS_COLOR } from './BonusCard.config';
import styles from './BonusCard.module.scss';

interface ICard extends Omit<IBonus, 'detail'> {
  onClick?: () => void;
}

export const BonusCard: FC<ICard> = ({ advertText, name, title, subtitle, logoBigLink, onClick }) => (
  <DeviceSizedCard
    color={BONUS_COLOR[name]}
    onClick={onClick}
    className={styles.card}
    vertical
  >
    <div>
      <img
        alt={BonusesDescriptionTexts.imgAlt}
        className={styles.logo}
        height={42}
        src={logoBigLink}
        width={116}
      />
    </div>
    <Typography.Text strong>{title}</Typography.Text>
    <Typography.Text
      className={cn(styles.subtitle, 'h-color-D60')}
      size={12}
    >
      {subtitle}
    </Typography.Text>
    {advertText && (
      <Typography.Text
        size={8}
        className="h-color-D50"
      >
        {advertText}
      </Typography.Text>
    )}
  </DeviceSizedCard>
);
