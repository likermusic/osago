import { act, renderHook } from '@testing-library/react-hooks';

import { mockAppSelector } from 'mocks/helpers';

import { ProlongationActionType } from 'shared/lib/sendGAEvents/events';

import { useAuthRedirect } from '../useAuthRedirect';

const mockCustomRouter = jest.fn();
jest.mock('shared/config/router', () => ({
  CustomRouter: {
    push: jest.fn().mockImplementation((...args) => {
      mockCustomRouter(...args);
    }),
  },
}));

const mockSendEventProlongation = jest.fn();
jest.mock('shared/lib/sendGAEvents', () => ({
  sendEventProlongation: jest.fn().mockImplementation((...args) => mockSendEventProlongation(...args)),
}));

describe('WHEN "useAuthRedirect" is mounted', () => {
  const formValue = { carNumber: 'c912tt44', vehicleType: 'car' } as const;

  it('MUST generate redirect link', () => {
    mockAppSelector.mockReturnValue({
      orderHash: '',
    });

    const { result } = renderHook(() => useAuthRedirect(formValue));

    act(() => {
      result.current();
    });

    expect(mockCustomRouter).toHaveBeenCalledWith('anketa', {
      query: {
        autoNumber: 'c912tt44',
      },
    });
  });

  describe('AND orderHash was provided', () => {
    beforeEach(() => {
      mockAppSelector.mockReturnValue({
        orderHash: '1234',
      });
    });

    it('MUST try to redirect on order page', () => {
      const { result } = renderHook(() => useAuthRedirect(formValue));

      act(() => {
        result.current();
      });

      expect(mockCustomRouter).toHaveBeenCalledWith('propositions', { query: { orderHash: '1234' } });
    });

    it('MUST send analytic event', async () => {
      const { result } = renderHook(() => useAuthRedirect(formValue));

      await act(async () => {
        await result.current();
      });

      expect(mockSendEventProlongation).toHaveBeenCalledWith(ProlongationActionType.RestoreCalculation, true);
    });
  });
});
