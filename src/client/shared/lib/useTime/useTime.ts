import { useEffect, useState } from 'react';

export const useTime = (initialTime: number, isInfinity?: boolean, onExpired?: () => void) => {
  const [seconds, setSeconds] = useState(initialTime);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (seconds > 0) {
        setSeconds((current) => current - 1);
      } else if (isInfinity) {
        setSeconds(initialTime);
      } else {
        clearInterval(intervalId);
        onExpired?.();
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [initialTime, isInfinity, onExpired, seconds]);

  return seconds;
};
