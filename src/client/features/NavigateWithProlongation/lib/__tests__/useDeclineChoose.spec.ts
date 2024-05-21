import { act, renderHook } from '@testing-library/react-hooks';

import { mockAppSelector } from 'mocks/helpers';

import { ProlongationActionType } from 'shared/lib/sendGAEvents/events';

import { useDeclineChoose } from '../useDeclineChoose';

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

describe('WHEN "useDeclineChoose" callback is called', () => {
  const formFields = { carNumber: 'c912tt44', vehicleType: 'car' } as const;

  mockAppSelector.mockReturnValue(true);

  it('MUST generate redirect link', () => {
    const { result } = renderHook(() => useDeclineChoose(formFields));

    act(() => {
      result.current();
    });

    expect(mockCustomRouter).toHaveBeenCalledWith('anketa', {
      query: {
        autoNumber: 'c912tt44',
      },
    });
  });

  it('MUST send analytic event', async () => {
    const { result } = renderHook(() => useDeclineChoose(formFields));

    await act(async () => {
      await result.current();
    });

    expect(mockSendEventProlongation).toHaveBeenCalledWith(ProlongationActionType.NewCalculation, true);
  });
});
