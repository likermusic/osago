import { act, renderHook } from '@testing-library/react-hooks';

import { waitForHookEffect } from 'mocks/helpers';

import { useCountDown } from '../index';

jest.useFakeTimers();
describe('WHEN "useCountDown" is mounted', () => {
  const callback = jest.fn();
  const defaultTimeValue = 300;

  it('MUST setup new interval counter', () => {
    const { result } = renderHook(() => useCountDown(defaultTimeValue, callback));

    expect(result.current.leftCount).toEqual(defaultTimeValue.toString());
  });

  it('AND timer is finished, MUST call callback function', async () => {
    renderHook(() => useCountDown(1, callback));

    act(() => {
      jest.runAllTimers();
    });

    await waitForHookEffect();

    expect(callback).toHaveBeenCalled();
  });

  it('AND timer was reset, MUST drop timer to provided value', async () => {
    const { result } = renderHook(() => useCountDown(defaultTimeValue, callback));

    act(() => {
      jest.runAllTimers();
    });

    await waitForHookEffect();

    await act(async () => {
      result.current.resetCountDown();
    });

    expect(result.current.leftCount).toEqual(`${defaultTimeValue}`);
  });
});
