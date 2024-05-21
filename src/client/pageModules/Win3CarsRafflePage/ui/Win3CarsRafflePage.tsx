import { useBoolean } from '@sravni/react-utils';
import { useEffect } from 'react';

import { useAppSelector } from 'shared/lib/redux';
import { sendEventRaffleBanner, sendEventRaffleLanding } from 'shared/lib/sendGAEvents';
import { usePrefetchNextPages } from 'shared/lib/usePrefetchNextPages';

import { isMobileAppRaffleSelector } from 'entities/appConfig';
import { RaffleCard } from 'entities/RaffleCard';
import { RaffleCardBtns } from 'entities/RaffleCardBtns';
import { RaffleCountdownTimer } from 'entities/RaffleCountdownTimer';
import { RaffleFAQ } from 'entities/RaffleFAQ';
import { RaffleHowTo } from 'entities/RaffleHowTo';
import { RafflePrevWinner } from 'entities/RafflePrevWinner';
import { RafflePrizes } from 'entities/RafflePrizes';
import { RaffleRules } from 'entities/RaffleRules';
import { RaffleWinners } from 'entities/RaffleWinners';

import { RaffleCalculationWidget } from 'widgets/CalculationWidget';
import { RaffleRegistration } from 'widgets/RaffleRegistration';

import {
  RaffleCalculationWidgetConfig,
  RaffleCardConfig,
  RaffleFAQConfig,
  RafflePrizesConfig,
  RaffleRulesConfig,
  RaffleWinnersConfig,
  getRaffleCardBtnsConfig,
  getRaffleHowToConfig,
  raffleRegistrationConfig,
} from '../lib/Win3CarsRafflePage.config';

import styles from './Win3CarsRafflePage.module.scss';

export const Win3CarsRafflePage: FC = () => {
  usePrefetchNextPages();

  const isMobileAppRaffle = useAppSelector(isMobileAppRaffleSelector);

  useEffect(() => {
    isMobileAppRaffle && sendEventRaffleBanner({ actionType: 'Показ розыгрыша в приложении', place: 'Мобилка' });
  }, [isMobileAppRaffle]);

  const raffleHowToConfig = getRaffleHowToConfig(isMobileAppRaffle);

  const [isRegistrationModalVisible, setRegistrationModalVisible] = useBoolean();

  return (
    <div className={styles.layout}>
      <RaffleCountdownTimer />
      <div className={styles.cardWrapper}>
        <RaffleCard
          config={RaffleCardConfig}
          imgClassName={styles.raffleCardImg}
        >
          <RaffleCardBtns
            config={getRaffleCardBtnsConfig(isMobileAppRaffle)}
            onRightBtnClick={() => {
              setRegistrationModalVisible.on();
              sendEventRaffleLanding({ place: 'Зарегистрировать полис' });
            }}
          />
        </RaffleCard>
      </div>

      <div className={styles.wrapper}>
        <RafflePrizes config={RafflePrizesConfig} />
      </div>

      <div className={styles.wrapper}>
        <RaffleHowTo config={raffleHowToConfig} />
      </div>

      <div className={styles.wrapper}>
        <RafflePrevWinner />
      </div>

      <div className={styles.grayBg}>
        {!isMobileAppRaffle && (
          <div className={styles.wrapper}>
            <RaffleCalculationWidget subtitle={RaffleCalculationWidgetConfig.subtitle} />
          </div>
        )}

        <div className={styles.wrapper}>
          <RaffleWinners
            subtitle={RaffleWinnersConfig.subtitle}
            onBtnClick={() => {
              sendEventRaffleLanding({ place: 'Участвовать в акции' });
              setRegistrationModalVisible.on();
            }}
          />
        </div>

        <div
          className={styles.wrapper}
          id={raffleHowToConfig.scrollToId}
        >
          <RaffleFAQ items={RaffleFAQConfig} />
        </div>
      </div>

      <div className={styles.grayBg}>
        <div className={styles.wrapper}>
          <RaffleRules texts={RaffleRulesConfig} />
        </div>
      </div>

      <RaffleRegistration
        config={raffleRegistrationConfig}
        isRegistrationModalVisible={isRegistrationModalVisible}
        onClose={setRegistrationModalVisible.off}
      />
    </div>
  );
};
