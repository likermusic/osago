import { NotificationManager } from '@sravni/react-design-system';
import { act, renderHook } from '@testing-library/react-hooks';

import { waitForHookEffect } from 'mocks/helpers';

import { useRestoreFormattedPriceAndCompany } from '../useRestoreFormattedPriceAndCompany';

const orderOrProlongationHash = 'dsdsd';

const mockUseDeepLink = jest.fn();
jest.mock('shared/lib/useDeeplink', () => ({
  useDeeplink: jest.fn().mockImplementation(() => mockUseDeepLink()),
}));

const mockRestoreSelectedPropositionInfo = jest.fn();

jest.mock('entities/selectedProposition', () => ({
  useRestoreSelectedPropositionInfo: jest
    .fn()
    .mockImplementation(() => [mockRestoreSelectedPropositionInfo, { isLoading: false }]),
}));

describe('WHEN "useRestoreFormattedPrice" is called', () => {
  beforeAll(() => {
    mockUseDeepLink.mockReturnValue({ params: { orderOrProlongationHash } });
  });

  afterEach(() => {
    // restore the spy created with spyOn
    jest.restoreAllMocks();
  });

  describe('AND price is not defined AND order hash exist', () => {
    it('MUST call restoreSelectedPropositionInfo', () => {
      const { result } = renderHook(() => useRestoreFormattedPriceAndCompany());

      act(() => {
        result.current.checkPriceValidation();
      });

      expect(mockRestoreSelectedPropositionInfo).toHaveBeenCalledWith(orderOrProlongationHash);
    });

    it('AND restoreSelectedPropositionInfo response is not valid, MUST call notification', async () => {
      const mockShow = jest.spyOn(NotificationManager, 'show');
      mockRestoreSelectedPropositionInfo.mockResolvedValue({ data: null, error: {} });

      const { result } = renderHook(() => useRestoreFormattedPriceAndCompany());

      act(() => {
        result.current.checkPriceValidation();
      });

      await waitForHookEffect();

      expect(mockShow).toHaveBeenCalled();
    });
  });
});
