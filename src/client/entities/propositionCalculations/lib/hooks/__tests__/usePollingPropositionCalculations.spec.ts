import { renderHook } from '@testing-library/react-hooks';

import type { PropositionCalculations } from 'commonTypes/api/propositionCalculations';
import { mockAppDispatch, TEST_ERROR, mockedSendAnalytics } from 'mocks/helpers';
import { MockPollingClass } from 'mocks/helpers/polling';
import { PROPOSITIONS_CORRECT_DATA } from 'mocks/propositionsData';

import {
  setPropositionStatus,
  setPropositionCalculation,
  updateStoreWhenCalculationPollingFinishedByTime,
  usePollingPropositionCalculations,
} from '../../../index';
import { mapGetCalculationsResponse } from '../../helpers/mapGetCalculationsResponse';

jest.mock('shared/lib/Polling', () => ({
  Polling: jest.fn().mockImplementation(() => new MockPollingClass()),
}));

describe('WHEN "usePollingPropositionCalculations" is mounted', () => {
  describe('AND polling starts function called', () => {
    it('AND hash was not provided, MUST NOT start polling', () => {
      const { result } = renderHook(() => usePollingPropositionCalculations());

      result.current();

      expect(MockPollingClass.onStart).not.toHaveBeenCalled();
    });

    describe('AND hash was provided', () => {
      it('MUST start polling', () => {
        const { result } = renderHook(() => usePollingPropositionCalculations());

        result.current('12');

        expect(MockPollingClass.onStart).toHaveBeenCalled();
      });

      it('MUST send polling start event', () => {
        const { result } = renderHook(() => usePollingPropositionCalculations());

        result.current('12');

        expect(mockedSendAnalytics).toHaveBeenCalledWith('osago_contact_step4_data');
      });
    });
  });

  describe('AND polling return data', () => {
    it('MUST update store for each provided data', () => {
      const data = {} as unknown as PropositionCalculations.GetCalculations;

      const { result } = renderHook(() => usePollingPropositionCalculations());

      result.current('12');

      MockPollingClass.onSuccess(data, false);
      MockPollingClass.onSuccess(data, false);
      MockPollingClass.onSuccess(data, false);

      expect(mockAppDispatch).toHaveBeenNthCalledWith(3, setPropositionCalculation(mapGetCalculationsResponse(data)));
    });

    it('AND polling finished, MUST update store with finished flag', () => {
      const data = {
        isCompleted: true,
        offers: PROPOSITIONS_CORRECT_DATA,
      } as unknown as PropositionCalculations.GetCalculations;

      const { result } = renderHook(() => usePollingPropositionCalculations());

      result.current('12');

      MockPollingClass.onSuccess(data, false);

      expect(MockPollingClass.onStop).toHaveBeenCalled();
    });
  });

  it('AND polling finished by timeout, MUST finish polling', () => {
    const data = {} as unknown as PropositionCalculations.GetCalculations;

    const { result } = renderHook(() => usePollingPropositionCalculations());

    result.current('12');

    MockPollingClass.onSuccess(data, true);

    expect(mockAppDispatch).toHaveBeenCalledWith(updateStoreWhenCalculationPollingFinishedByTime());
  });

  it('AND polling return error, MUST update store with error message', () => {
    const { result } = renderHook(() => usePollingPropositionCalculations());

    result.current('12');

    MockPollingClass.onError(TEST_ERROR);

    expect(mockAppDispatch).toHaveBeenCalledWith(setPropositionStatus('error'));
  });
});
