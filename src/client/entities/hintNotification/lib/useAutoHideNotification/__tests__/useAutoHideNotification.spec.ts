import { act, renderHook } from '@testing-library/react-hooks';

import { mockAppDispatch } from 'mocks/helpers';

import { clearNotification, setNotification } from '../../../model/hintNotifications.slice';
import { HIDE_CARD_DELAY, useAutoHideNotification } from '../useAutoHideNotification';

describe('WHEN "useShowBlurCardTooltip" is mounted AND "showTooltip" function was called', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  it(`AND card was selected, MUST toggle show tooltip flag within ${HIDE_CARD_DELAY} threshold`, () => {
    const { result } = renderHook(() => useAutoHideNotification());

    act(() => {
      result.current('test');
    });

    expect(mockAppDispatch).toHaveBeenCalledWith(
      setNotification({
        message: 'test',
        position: 0,
        type: 'info',
      }),
    );

    act(() => {
      jest.runAllTimers();
    });

    expect(mockAppDispatch).toHaveBeenCalledWith(clearNotification());
  });

  it('AND card was reset, MUST update drop selected value', () => {
    const { result } = renderHook(() => useAutoHideNotification());

    act(() => {
      result.current('test');
    });

    act(() => {
      result.current('');
    });

    expect(mockAppDispatch).toHaveBeenCalledWith(clearNotification());
  });
});
