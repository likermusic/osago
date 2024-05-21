import { renderHook } from '@testing-library/react-hooks';

import type { PropositionCalculations } from 'commonTypes/api/propositionCalculations';
import { mockAppDispatch, mockAppSelector, TEST_ERROR } from 'mocks/helpers';
import { MockPollingClass } from 'mocks/helpers/polling';

import {
  setActiveOrderToError,
  setIsOrderCompleted,
  setOrderCalculations,
  updateStoreWhenOrderPollingFinishedByTime,
} from 'entities/order';

import { mapOrderCalculationsResponse } from '../../helpers/mapOrderCalculationsResponse';
import { useOrderPolling } from '../useOrderPolling';

describe('WHEN "useOrderPolling" is mounted', () => {
  it('AND hash was not provided, MUST NOT start polling', () => {
    mockAppSelector.mockReturnValue('');

    renderHook(() => useOrderPolling());

    expect(MockPollingClass.onStart).not.toHaveBeenCalled();
  });

  it('AND hash was provided, MUST start polling', () => {
    mockAppSelector.mockReturnValue('12');

    renderHook(() => useOrderPolling());

    expect(MockPollingClass.onStart).toHaveBeenCalled();
  });

  describe('AND polling return data', () => {
    it('MUST update store for each provided data', () => {
      mockAppSelector.mockReturnValue('12');

      const data = {} as unknown as PropositionCalculations.GetManyOrders;

      renderHook(() => useOrderPolling());

      MockPollingClass.onSuccess(data, false);
      MockPollingClass.onSuccess(data, false);
      MockPollingClass.onSuccess(data, false);

      expect(mockAppDispatch).toHaveBeenNthCalledWith(3, setOrderCalculations(mapOrderCalculationsResponse(data)));
    });

    it('AND polling finished, MUST update store with finished flag', () => {
      mockAppSelector.mockReturnValue('12');

      const data = {
        isCompleted: true,
      } as unknown as PropositionCalculations.GetManyOrders;

      renderHook(() => useOrderPolling());

      MockPollingClass.onSuccess(data, false);

      expect(mockAppDispatch).toHaveBeenCalledWith(setIsOrderCompleted(true));
      expect(MockPollingClass.onStop).toHaveBeenCalled();
    });
  });

  it('AND polling finished by timeout, MUST finish polling', () => {
    mockAppSelector.mockReturnValue('12');

    const data = {} as unknown as PropositionCalculations.GetManyOrders;

    renderHook(() => useOrderPolling());

    MockPollingClass.onSuccess(data, true);

    expect(mockAppDispatch).toHaveBeenCalledWith(setIsOrderCompleted(true));
    expect(mockAppDispatch).toHaveBeenCalledWith(updateStoreWhenOrderPollingFinishedByTime());
  });

  it('AND polling return error, MUST update store with error message', () => {
    mockAppSelector.mockReturnValue('12');

    renderHook(() => useOrderPolling());

    MockPollingClass.onError(TEST_ERROR);

    expect(mockAppDispatch).toHaveBeenCalledWith(setActiveOrderToError());
  });
});
