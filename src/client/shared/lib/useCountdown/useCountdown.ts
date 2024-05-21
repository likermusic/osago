import { useIsPhone } from '@sravni/react-utils';
import { useEffect, useMemo, useState } from 'react';

import { CountdownTimer } from 'shared/lib/countdownTimer/countdownTimer';

import { generateCountdownString } from './utils';

interface IUseCountdownOptions {
  isShortWhenMobile?: boolean;
  isWithoutMinutes?: boolean;
  isWithoutColon?: boolean;
}

const zeroTime = { days: 0, hours: 0, minutes: 0 };

export const useCountdown = (endsTitle: string, endDate: string, options: IUseCountdownOptions) => {
  const { isShortWhenMobile, isWithoutMinutes, isWithoutColon } = options;
  const [currentTime, setCurrentTime] = useState(zeroTime);
  const isPhone = useIsPhone();

  useEffect(() => {
    const timer = new CountdownTimer(new Date(endDate), 'sec');
    const printTime = () => {
      const time = timer.timeLeft();
      setCurrentTime(time || zeroTime);
    };
    printTime();
    timer.start(printTime);

    return () => timer.remove();
  }, [endDate]);

  const countdownString = useMemo(
    () =>
      generateCountdownString(currentTime.days, currentTime.hours, currentTime.minutes, {
        isShort: isShortWhenMobile ? isPhone : undefined,
        endsTitle,
        isWithoutMinutes,
        isWithoutColon,
      }),
    [
      currentTime.days,
      currentTime.hours,
      currentTime.minutes,
      endsTitle,
      isPhone,
      isShortWhenMobile,
      isWithoutColon,
      isWithoutMinutes,
    ],
  );

  return countdownString;
};
