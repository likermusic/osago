import { useCallback, useEffect, useState } from 'react';

export const PROGRESS_CHANGE_DELTA_SECONDS = 0.05;
const INITIAL_STATE = { 0: 0 };
const MAX_PERCENT = 100;

const setMaxPercentOnEveryStep = <T,>(arr: T[]) =>
  arr.reduce<Record<number, typeof MAX_PERCENT>>((prev, _, i) => {
    prev[i] = MAX_PERCENT;
    return prev;
  }, {});

export const useTimerWithSteps = <T extends { durationInSeconds: number }>(
  content: T[],
  isInfinity = false,
  isTimerStopped = false,
) => {
  const [percent, setPercent] = useState<Record<number, number>>(INITIAL_STATE);
  const [activeStep, setActiveStep] = useState(0);
  const activeStepPercent = percent[activeStep];

  useEffect(() => {
    const isLastStep = activeStep >= content.length - 1;

    // условие мгновенного перехода на последний шаг
    if (isTimerStopped) {
      setActiveStep(content.length - 1);
      // для каждого шага устанавливаю максимальный процент
      setPercent(() => setMaxPercentOnEveryStep(content));
      // условие перехода на следующий шаг
    } else if (activeStepPercent >= MAX_PERCENT && !isLastStep) {
      setPercent((percentCurrent) => ({ ...percentCurrent, [activeStep + 1]: 0 }));
      setActiveStep((state) => state + 1);
      // условие запуска первого баннера заново
    } else if (activeStepPercent >= MAX_PERCENT && isLastStep && isInfinity) {
      setActiveStep(0);
      setPercent(INITIAL_STATE);
    }

    const timeout = setInterval(() => {
      if (activeStepPercent < MAX_PERCENT) {
        // проверка, что продолжаем увеличивать процент
        setPercent((percentCurrent) => ({
          ...percentCurrent,
          [activeStep]:
            percentCurrent[activeStep] +
            (MAX_PERCENT / content[activeStep].durationInSeconds) * PROGRESS_CHANGE_DELTA_SECONDS,
        }));
      }
    }, 1000 * PROGRESS_CHANGE_DELTA_SECONDS);

    return () => clearInterval(timeout);
  }, [content, activeStep, content.length, isInfinity, isTimerStopped, activeStepPercent]);

  const onChangeActiveStep = useCallback(
    (i: number) => {
      setPercent(
        // записываю прогресс для каждого баннера в зависимости от выбранного баннера пользователем
        content.reduce<Record<number, number>>((acc, _, idx) => {
          acc[idx] = Number(idx) < i ? MAX_PERCENT : 0;
          return acc;
        }, {}),
      );
      // устанавливаю активным шаг на который кликнул пользак
      setActiveStep(i);
    },
    [content],
  );

  return { percent, activeStep, onChangeActiveStep };
};
