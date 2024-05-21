import { Card, Typography } from '@sravni/react-design-system';
import { useIsMobile } from '@sravni/react-utils';
import cn from 'classnames';

import type { TRaffleCardConfig } from '../types';

import styles from './RaffleCard.module.scss';

export type TRaffleCardProps = {
  config: TRaffleCardConfig;
  imgClassName: string;
};

export const RaffleCard: FC<TRaffleCardProps> = ({ className, config, children, imgClassName }) => {
  const isMobile = useIsMobile();
  const { title, subtitle, mainImg, backgroundMobileUrl, backgroundDesktopUrl } = config;

  return (
    <Card
      className={cn(styles.card, className)}
      style={{ backgroundImage: `url(${isMobile ? backgroundMobileUrl : backgroundDesktopUrl})` }}
    >
      <Typography.Heading
        level={isMobile ? 2 : 1}
        className={styles.title}
      >
        {title}
      </Typography.Heading>
      <Typography.Text
        size={16}
        className={cn('h-color-D10 h-text-center', isMobile ? 'h-mb-32' : 'h-mb-40')}
      >
        {subtitle}
      </Typography.Text>

      {children}

      <img
        className={imgClassName}
        src={mainImg}
        alt={title}
      />
    </Card>
  );
};
