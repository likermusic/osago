import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react-dom/test-utils';

import { useTime } from '../useTime';

const TIME_SECONDS = 20;
const TIME_MILISECONDS = TIME_SECONDS * 1000;

jest.useFakeTimers();
describe('WHEN "useTime" is mounted', () => {
  it('MUST not call onExpired only after timer stop', () => {
    const callback = jest.fn();
    act(() => {
      const { result, rerender } = renderHook(() => useTime(TIME_SECONDS, false, callback));

      expect(callback).not.toBeCalled();
      expect(result.current).toEqual(TIME_SECONDS);

      // таймер точно кончился
      jest.advanceTimersByTime(TIME_MILISECONDS * TIME_MILISECONDS);

      rerender();
      expect(callback).toHaveBeenCalledTimes(1);
      expect(result.current).toEqual(0);
    });
  });
});
