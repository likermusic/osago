import { useState, useEffect } from 'react';

export function useCountDown(defaultCount: number, onCountDownEnd: () => void) {
  const [counter, setCounter] = useState(defaultCount);

  useEffect(() => {
    const timer = counter > 0 ? setInterval(() => setCounter(counter - 1), 1000) : 0;

    if (counter <= 0) {
      onCountDownEnd();
    }

    return () => clearInterval(timer);
  }, [counter, onCountDownEnd]);

  const resetCountDown = () => {
    setCounter(defaultCount);
  };

  const resultString = counter.toString().length < 2 ? `0${counter}` : counter.toString();

  return { resetCountDown, leftCount: resultString };
}
