import { renderHook } from '@testing-library/react-hooks';

import { mockAppSelector } from 'mocks/helpers';

import { isUserLoggedInSelector } from 'entities/user';

import { lotteryNameSelector } from '../../model/RaffleRegistration.selectors';
import { useGetPoliciesForRaffle } from '../useGetPoliciesForRaffle'; // Update with the actual file name

const mockUseLazyGetPoliciesForRaffle = jest.fn();

jest.mock('../../model/RaffleRegistration.query', () => ({
  useLazyGetPoliciesForRaffle: jest.fn().mockImplementation(() => mockUseLazyGetPoliciesForRaffle()),
}));

describe('WHEN useGetPoliciesForRaffle is called', () => {
  let isAuthedMock = true;
  const mockLotteryName = 'TestLotteryName';
  const mockGetPoliciesForRaffle = jest.fn();
  const isLoadingMock = false;
  const isErrorMock = false;

  beforeEach(() => {
    mockAppSelector.mockImplementation((selector) => {
      if (selector === isUserLoggedInSelector) return isAuthedMock;
      if (selector === lotteryNameSelector) return mockLotteryName;
    });

    mockUseLazyGetPoliciesForRaffle.mockReturnValue([
      mockGetPoliciesForRaffle,
      { isLoading: isLoadingMock, isError: isErrorMock },
    ]);
  });

  it('AND isAuthed, lotteryName both are truthy, MUST call getPoliciesForRafflе', () => {
    const { result } = renderHook(() => useGetPoliciesForRaffle());

    expect(mockGetPoliciesForRaffle).toHaveBeenCalledTimes(1);
    expect(mockGetPoliciesForRaffle).toHaveBeenCalledWith(mockLotteryName);
    expect(result.current.isLoading).toBe(isLoadingMock);
    expect(result.current.isError).toBe(isErrorMock);
  });

  it('AND isAuthed is false, MUST call getPoliciesForRafflе', () => {
    isAuthedMock = false;
    const { result } = renderHook(() => useGetPoliciesForRaffle());

    expect(mockGetPoliciesForRaffle).not.toHaveBeenCalled();
    expect(result.current.isLoading).toBe(isLoadingMock);
    expect(result.current.isError).toBe(isErrorMock);
  });
});
