import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react-dom/test-utils';

import { useDelayUnmount } from '../useDelayUnmount';

const TIME_MILISECONDS = 100;

jest.useFakeTimers();
describe('WHEN "useDelayUnmount" is mounted', () => {
  it('while mounting MUST return true only when timer finished', () => {
    act(() => {
      const { result, rerender } = renderHook(() => useDelayUnmount(true, TIME_MILISECONDS));

      expect(result.current).toEqual(false);

      // таймер точно кончился
      jest.advanceTimersByTime(TIME_MILISECONDS * TIME_MILISECONDS);

      rerender();
      expect(result.current).toEqual(true);
    });
  });

  it('while unmounting MUST return false', () => {
    act(() => {
      const { result, rerender } = renderHook(() => useDelayUnmount(false, TIME_MILISECONDS));

      expect(result.current).toEqual(false);

      // таймер точно кончился
      jest.advanceTimersByTime(TIME_MILISECONDS * TIME_MILISECONDS);

      rerender();
      expect(result.current).toEqual(false);
    });
  });
});
