import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react-dom/test-utils';

import { PROGRESS_CHANGE_DELTA_SECONDS, useTimerWithSteps } from '../useTimerWithSteps';

const TIME_SECONDS = 1;
const TIME_MILISECONDS = TIME_SECONDS * 1000;
const ONE_TICK_TIME_MILISECONDS = PROGRESS_CHANGE_DELTA_SECONDS * 1000;
const CONTENT = [
  { durationInSeconds: TIME_SECONDS },
  { durationInSeconds: TIME_SECONDS },
  { durationInSeconds: TIME_SECONDS },
];

const FULL_COMPLETE = { '0': 100, '1': 100, '2': 100 };

jest.useFakeTimers();

describe('WHEN "useTimerWithSteps" is mounted', () => {
  it('MUST go step by step', () => {
    act(() => {
      const { result, rerender } = renderHook(() => useTimerWithSteps(CONTENT, false, false));

      expect(result.current.percent).toEqual({ '0': 0 });
      expect(result.current.activeStep).toEqual(0);

      // таймер прошел первый шаг и начал второй
      jest.advanceTimersByTime(TIME_MILISECONDS + ONE_TICK_TIME_MILISECONDS);

      rerender();
      expect(result.current.percent).toEqual({ '0': 100, '1': 0 });
      expect(result.current.activeStep).toEqual(1);

      // таймер прошел второй шаг и начал третий
      jest.advanceTimersByTime(TIME_MILISECONDS);

      rerender();
      expect(result.current.percent).toEqual({ '0': 100, '1': 100, '2': 0 });
      expect(result.current.activeStep).toEqual(2);

      // таймер прошел третий шаг и остановился время точно кончилось
      jest.advanceTimersByTime(TIME_MILISECONDS + TIME_MILISECONDS);

      rerender();
      expect(result.current.percent).toEqual(FULL_COMPLETE);
      expect(result.current.activeStep).toEqual(2);
    });
  });

  it('MUST restart timer with infinity props', () => {
    act(() => {
      const { result, rerender } = renderHook(() => useTimerWithSteps(CONTENT, true, false));

      expect(result.current.percent).toEqual({ '0': 0 });
      expect(result.current.activeStep).toEqual(0);

      // таймер прошел круг и начал заново
      jest.advanceTimersByTime(TIME_MILISECONDS * 5 + 2 * ONE_TICK_TIME_MILISECONDS);

      rerender();
      expect(result.current.percent).toEqual({ '0': 100, '1': 100, '2': 0 });
      expect(result.current.activeStep).toEqual(2);
    });
  });

  it('MUST always return completed status when order ready', () => {
    act(() => {
      const { result, rerender } = renderHook(() => useTimerWithSteps(CONTENT, true, true));

      // таймер прошел первый тик
      jest.advanceTimersByTime(ONE_TICK_TIME_MILISECONDS);
      rerender();

      expect(result.current.percent).toEqual(FULL_COMPLETE);
      expect(result.current.activeStep).toEqual(2);

      // таймер прошел шаг
      jest.advanceTimersByTime(TIME_MILISECONDS);

      rerender();
      expect(result.current.percent).toEqual(FULL_COMPLETE);
      expect(result.current.activeStep).toEqual(2);
    });
  });

  it('MUST change active step after with onChangeActiveStep', () => {
    act(() => {
      const { result, rerender } = renderHook(() => useTimerWithSteps(CONTENT, false, false));

      expect(result.current.percent).toEqual({ '0': 0 });
      expect(result.current.activeStep).toEqual(0);

      // пользователь выбрал второй шаг
      result.current.onChangeActiveStep(2);

      // таймер сделал тик
      jest.advanceTimersByTime(ONE_TICK_TIME_MILISECONDS);
      rerender();

      expect(result.current.percent).toEqual({ '0': 100, '1': 100, '2': 0 });
      expect(result.current.activeStep).toEqual(2);

      // таймер пошел дальше и закончил 3 шаг
      jest.advanceTimersByTime(TIME_MILISECONDS);

      rerender();
      expect(result.current.percent).toEqual(FULL_COMPLETE);
      expect(result.current.activeStep).toEqual(2);
    });
  });
});
