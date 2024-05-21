import { renderHook } from '@testing-library/react-hooks';

import { mockIsMobileOnly, waitForAsyncEffect } from 'mocks/helpers';

import { useUpdateCarNumberField } from '../useUpdateCarNumberField';

const mockPrefillFieldsByCarNumber = jest.fn();
jest.mock('../usePrefillCarInfo', () => ({
  usePrefillCarInfo: () => ({
    isLoading: false,
    prefillFieldsByCarNumber: jest.fn().mockImplementation(() => mockPrefillFieldsByCarNumber()),
  }),
  mapCarInfo: jest.fn(),
}));

describe('WHEN "useUpdateCarNumberField" is mounted', () => {
  const carNumberFieldName = 'carNumber';

  describe('AND "runUpdateCarNumberOnBlur" is called', () => {
    it('AND it is desktop, MUST send query to auto info service for car info data', () => {
      mockIsMobileOnly.mockReturnValue(false);
      const { result } = renderHook(() => useUpdateCarNumberField(carNumberFieldName, false));

      result.current.runUpdateCarNumberOnBlur();

      expect(mockPrefillFieldsByCarNumber).toHaveBeenCalled();
    });

    it('AND it is mobile, MUST exit', () => {
      mockIsMobileOnly.mockReturnValue(true);
      const { result } = renderHook(() => useUpdateCarNumberField(carNumberFieldName, false));

      result.current.runUpdateCarNumberOnBlur();

      expect(mockPrefillFieldsByCarNumber).not.toHaveBeenCalled();
    });
  });

  describe('AND "runUpdateCarNumberOnMobile" is called', () => {
    const nextScreenCallback = jest.fn();

    beforeAll(() => {
      mockPrefillFieldsByCarNumber.mockResolvedValue(true);
    });

    it('MUST do request for car info data', () => {
      const { result } = renderHook(() => useUpdateCarNumberField(carNumberFieldName, false));

      result.current.runUpdateCarNumberOnMobile(nextScreenCallback);

      expect(mockPrefillFieldsByCarNumber).toHaveBeenCalled();
    });

    it('MUST call call focus view next screen callback after request', async () => {
      const { result } = renderHook(() => useUpdateCarNumberField(carNumberFieldName, false));

      result.current.runUpdateCarNumberOnMobile(nextScreenCallback);

      await waitForAsyncEffect();

      expect(nextScreenCallback).toHaveBeenCalled();
    });
  });
});
