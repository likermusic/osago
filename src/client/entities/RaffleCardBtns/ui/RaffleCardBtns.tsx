import { Button, Space } from '@sravni/react-design-system';
import { useIsMobile } from '@sravni/react-utils';
import cn from 'classnames';

import { CustomRouter } from 'shared/config/router';
import { sendEventRaffleLanding } from 'shared/lib/sendGAEvents';

import styles from './RaffleCardBtns.module.scss';

export type TRaffleCardBtnsProps = {
  config: {
    btnLeftText?: string;
    btnRightText: string;
  };
  onRightBtnClick: () => void;
};

export const RaffleCardBtns: FC<TRaffleCardBtnsProps> = ({ config, onRightBtnClick }) => {
  const { btnLeftText, btnRightText } = config;
  const isMobile = useIsMobile();

  const onBuyPolicyClick = () => {
    sendEventRaffleLanding({ place: 'Купить полис ОСАГО' });
    CustomRouter.push('main');
  };

  return (
    <Space
      size={12}
      direction={isMobile ? 'column-reverse' : 'horizontal'}
      justify="center"
      align="center"
      className={styles.wrapper}
    >
      {btnLeftText && (
        <Button
          variant="secondary"
          color="blue"
          size={60}
          className={styles.btn}
          onClick={onBuyPolicyClick}
        >
          {btnLeftText}
        </Button>
      )}
      {btnRightText && (
        <Button
          variant="primary"
          size={60}
          className={cn(styles.btn, styles.btnRight)}
          onClick={onRightBtnClick}
        >
          {btnRightText}
        </Button>
      )}
    </Space>
  );
};
