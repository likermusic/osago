import { act } from '@testing-library/react-hooks';
import type { AxiosError } from 'axios';

import { mockAxiosGet, TEST_ERROR, waitForAsyncEffect } from 'mocks/helpers';

import { Polling } from '../polling';

jest.unmock('../polling');
const mockIsPast = jest.fn();
jest.mock('date-fns', () => ({
  ...jest.requireActual('date-fns'),
  isPast: jest.fn().mockImplementation(() => mockIsPast()),
}));

describe('WHEN "Polling" created AND poling is started', () => {
  const onSuccess = jest.fn();
  const onError = jest.fn();

  const testPolling = new Polling({
    maxPollingIntervalMs: 3000,
    pollingIntervalMs: 1000,
    urlKey: 'getManyOrders',
  });

  testPolling.setOnError(onError);
  testPolling.setOnSuccess(onSuccess);

  const successResp = {};

  beforeEach(() => {
    jest.useFakeTimers();
    mockAxiosGet.mockResolvedValue({ data: successResp });
  });

  describe('AND watchdog was not ended up', () => {
    it('MUST start new request each time', async () => {
      mockIsPast.mockReturnValueOnce(false).mockReturnValueOnce(false).mockReturnValueOnce(true);
      testPolling.startPolling({});

      await act(async () => {
        jest.advanceTimersToNextTimer(1);
        await waitForAsyncEffect();
        jest.advanceTimersToNextTimer(2);
        await waitForAsyncEffect();
        jest.advanceTimersToNextTimer(3);
      });

      expect(onSuccess).toHaveBeenCalledTimes(3);
      expect(onSuccess).toHaveBeenNthCalledWith(3, successResp, true);
      expect(mockAxiosGet).toHaveBeenCalledTimes(3);
    });

    describe('AND request was finished with error', () => {
      beforeEach(async () => {
        const axiosError = new Error(TEST_ERROR.message) as AxiosError;
        axiosError.response = {
          status: 500,
        } as AxiosError['response'];

        mockAxiosGet.mockRejectedValue(axiosError);

        testPolling.startPolling({});

        await act(async () => {
          jest.advanceTimersToNextTimer(1);
          await waitForAsyncEffect();
          jest.advanceTimersToNextTimer(2);
          await waitForAsyncEffect();
          jest.advanceTimersToNextTimer(3);
          await waitForAsyncEffect();
        });
      });

      it('MUST call error handler', () => {
        expect(onSuccess).toHaveBeenCalledTimes(0);
        expect(onError).toHaveBeenCalledTimes(1);
      });

      it('MUST stop polling', () => {
        expect(mockAxiosGet).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('AND there was another active polling', () => {
    beforeEach(async () => {
      mockIsPast
        .mockReturnValueOnce(false)
        .mockReturnValueOnce(false)
        .mockReturnValueOnce(false)
        .mockReturnValueOnce(true);

      testPolling.startPolling({});

      await act(async () => {
        jest.advanceTimersToNextTimer(1);
        await waitForAsyncEffect();
        testPolling.startPolling({});
      });

      await act(async () => {
        jest.advanceTimersToNextTimer(1);
        await waitForAsyncEffect();
        jest.advanceTimersToNextTimer(2);
        await waitForAsyncEffect();
        jest.advanceTimersToNextTimer(3);
      });
    });

    it('MUST stop prev polling', () => {
      expect(onSuccess).toHaveBeenCalledTimes(4);
    });

    it('MUST stop prev polling watchdog timer', () => {
      expect(mockAxiosGet).toHaveBeenCalledTimes(4);
    });

    it('MUST call onSuccess function with second flag is finished', () => {
      expect(onSuccess).toHaveBeenNthCalledWith(4, successResp, true);
    });
  });

  describe('AND user stops active polling', () => {
    it('MUST stop poling by the abort controller', async () => {
      mockIsPast.mockReturnValue(false);

      testPolling.startPolling({});

      await act(async () => {
        jest.advanceTimersToNextTimer(1);
        testPolling.stopPolling();
        jest.runAllTimers();
      });

      expect(onSuccess).toHaveBeenCalledWith(successResp, false);
    });

    it('AND then run again, MUST start new polling', async () => {
      mockIsPast.mockReturnValue(false);
      testPolling.startPolling({});

      await act(async () => {
        jest.advanceTimersToNextTimer(1);
        testPolling.stopPolling();
      });

      await act(async () => {
        testPolling.startPolling({});
        jest.advanceTimersToNextTimer(1);
        await waitForAsyncEffect();
        jest.advanceTimersToNextTimer(2);
        await waitForAsyncEffect();
        jest.advanceTimersToNextTimer(3);
      });

      expect(onSuccess).toHaveBeenCalledWith(successResp, false);
    });
  });
});
