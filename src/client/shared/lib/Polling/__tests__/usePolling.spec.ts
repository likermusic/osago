import { jest } from '@jest/globals';
import { act, renderHook } from '@testing-library/react-hooks';

import type { TUsePolling } from '../usePolling';
import { usePolling } from '../usePolling';

const EMPTY_ERROR = undefined;
const ERROR = {
  error: 'error',
  status: 'CUSTOM_ERROR',
} as const;

describe('WHEN "usePolling" is mounted', () => {
  const polling = 100;
  const pollingMax = 1000;
  const updateSubscriptionOptionsMock = jest.fn();
  const polingStartCb = jest.fn().mockImplementation(() => ({
    updateSubscriptionOptions: updateSubscriptionOptionsMock,
  })) as TUsePolling<unknown>;

  describe('AND "startPoling" is called', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    it('MUST start polling timer', () => {
      const { result } = renderHook(() => usePolling(polingStartCb, polling, pollingMax, EMPTY_ERROR));

      act(() => {
        result.current.startPoling(null);
      });

      expect(result.current.isActive).toBeTruthy();
      expect(updateSubscriptionOptionsMock).toHaveBeenCalledWith({ pollingInterval: polling });
    });

    it('AND threshold time is reached, MUST automatically stop polling', () => {
      const { result } = renderHook(() => usePolling(polingStartCb, polling, polling, EMPTY_ERROR));

      act(() => {
        result.current.startPoling(null);
      });

      act(() => {
        jest.advanceTimersToNextTimer(1);
      });

      expect(result.current.isActive).toBeFalsy();
      expect(updateSubscriptionOptionsMock).toHaveBeenCalledWith({ pollingInterval: 0 });
    });

    it('AND "stopPolling" is called, MUST stop polling immediately', () => {
      const { result } = renderHook(() => usePolling(polingStartCb, polling, pollingMax, EMPTY_ERROR));

      act(() => {
        result.current.startPoling(null);
        jest.runAllTicks();
      });

      act(() => {
        result.current.stopPoling();
      });

      expect(result.current.isActive).toBeFalsy();
      expect(updateSubscriptionOptionsMock).toHaveBeenCalledWith({ pollingInterval: 0 });
    });

    it('AND polling has error, firstly MUST return error only after retry ticks', () => {
      const { result, rerender } = renderHook(() => usePolling(polingStartCb, polling, pollingMax, ERROR));

      act(() => {
        result.current.startPoling(null);
      });
      expect(result.current.error).toBeUndefined();

      jest.runAllTimers();

      act(() => {
        rerender();
      });

      expect(result.current.error).toEqual(ERROR);
    });
  });
});
