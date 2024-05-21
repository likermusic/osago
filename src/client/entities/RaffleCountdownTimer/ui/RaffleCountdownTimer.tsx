import { Typography } from '@sravni/react-design-system';

import { SHOULD_SHOW_TIMER_ON_RAFFLE } from 'constants/FEATURE_FLAGS';

import { useCountdown } from 'shared/lib/useCountdown';

import styles from './RaffleCountdownTimer.module.scss';
import { RaffleCountdownTimerTexts } from './RaffleCountdownTimer.texts';

export const RaffleCountdownTimer = ({ isWL = false }) => {
  const text = useCountdown(RaffleCountdownTimerTexts.endTitle, RaffleCountdownTimerTexts.endDate, {});

  if (!SHOULD_SHOW_TIMER_ON_RAFFLE || isWL) return null;
  return (
    <div className={styles.timeToEndAlert}>
      <Typography.Text
        strong
        size={12}
        uppercase
      >
        {text}
      </Typography.Text>
    </div>
  );
};
