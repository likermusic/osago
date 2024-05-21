import { jest } from '@jest/globals';
import { act, renderHook } from '@testing-library/react-hooks';

import { TEST_ERROR } from 'mocks/helpers';

import { useLoadPolicyLink } from '../useLoadPolicyLink';

const mockUseGetPolicyLink = jest.fn();
jest.mock('../../model/purchasedPolicy.query', () => ({
  useGetPolicyLink: jest.fn().mockImplementation((...args: unknown[]) => mockUseGetPolicyLink(...args)),
}));

describe('WHEN "useLoadPolicyLink" is mounted', () => {
  const setPolingOptions = jest.fn();
  const startPoling = jest.fn().mockImplementation(() => ({
    updateSubscriptionOptions: setPolingOptions,
  }));

  beforeEach(() => {
    mockUseGetPolicyLink.mockReturnValue([
      startPoling,
      {
        data: null,
        error: null,
      },
    ]);
  });

  it('AND "orderHash" was not provided, MUST not do request', () => {
    renderHook(() => useLoadPolicyLink());

    expect(startPoling).not.toHaveBeenCalled();
  });

  it('AND "orderHash" was provided, MUST enable policy link request', () => {
    renderHook(() => useLoadPolicyLink('test'));

    expect(startPoling).toHaveBeenCalledWith('test');
  });

  it('AND request was failed, MUST disable polling after 3 retries', () => {
    jest.useFakeTimers();

    mockUseGetPolicyLink.mockReturnValue([
      startPoling,
      {
        data: null,
        error: TEST_ERROR,
      },
    ]);

    const { rerender } = renderHook(() => useLoadPolicyLink('test'));

    jest.advanceTimersToNextTimer(10);

    act(() => {
      rerender();
    });

    expect(setPolingOptions).toHaveBeenCalledWith({ pollingInterval: 0 });
  });

  it('AND request was succeed, MUST disable polling', () => {
    mockUseGetPolicyLink.mockReturnValue([
      startPoling,
      {
        data: {
          archiveLink: '123',
          policyLink: '123',
        },
        error: null,
      },
    ]);

    const { rerender } = renderHook(() => useLoadPolicyLink('test'));

    expect(setPolingOptions).toHaveBeenCalledWith({ pollingInterval: 10000 });

    act(() => {
      rerender();
    });

    expect(setPolingOptions).toHaveBeenCalledWith({ pollingInterval: 0 });
  });
});
