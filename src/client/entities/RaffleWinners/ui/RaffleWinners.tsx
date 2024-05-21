import { Button, Card, Space, Typography } from '@sravni/react-design-system';
import { useIsMobile } from '@sravni/react-utils';
import cn from 'classnames';

import styles from './RaffleWinners.module.scss';
import { RaffleWinnersTexts } from './RaffleWinners.texts';

export type TRaffleWinnersProps = {
  subtitle: string;
  onBtnClick: () => void;
};

export const RaffleWinners: FC<TRaffleWinnersProps> = ({ subtitle, onBtnClick }) => {
  const isMobile = useIsMobile();

  return (
    <Space
      size={24}
      className={styles.wrapper}
      direction="vertical"
    >
      <Card className={styles.card}>
        <Typography.Heading
          level={5}
          className={cn('h-color-L100', styles.title)}
        >
          {RaffleWinnersTexts.title}
        </Typography.Heading>

        <Typography.Heading
          level={isMobile ? 2 : 3}
          className="h-color-L100 h-text-center"
        >
          {subtitle}
        </Typography.Heading>

        <Button
          color="blue"
          variant="secondary"
          size={60}
          onClick={onBtnClick}
        >
          {RaffleWinnersTexts.btnTitle}
        </Button>
      </Card>
    </Space>
  );
};
