import { act, renderHook } from '@testing-library/react-hooks';

import { mockHashWasmMd5 } from 'mocks/helpers/hashWasm';
import { mockAppDispatch, mockUseVehicleNumber, waitForHookEffect } from 'mocks/index';

import { usePrefillCarInfo } from '../usePrefillCarInfo';

const mockTryLoadDataByCarNumberThunk = jest.fn();
jest.mock('entities/carInfo/lib/restoreDataByCarNumberThunk', () => ({
  tryLoadDataByCarNumberThunk: (...args: unknown[]) => mockTryLoadDataByCarNumberThunk(...args),
}));

describe('WHEN "usePrefillCarInfo" is mounted', () => {
  const testCallback = jest.fn();
  const testNumberField = 'test';
  const currentNumberValid = 'А217МВ197';
  const currentNumberInValid = 'AM21QA';
  const testDictionaries = {
    years: [2022],
  };

  beforeEach(() => {
    mockUseVehicleNumber.mockReturnValue({
      isNumberValid: true,
      currentNumber: currentNumberValid,
    });

    mockAppDispatch.mockImplementation((data: unknown) => (typeof data === 'function' ? data() : data));

    mockTryLoadDataByCarNumberThunk.mockResolvedValue(testDictionaries);
  });

  it('MUST return current loading state as false', () => {
    mockUseVehicleNumber.mockReturnValue({
      isNumberValid: true,
      currentNumber: currentNumberValid,
    });

    const { result } = renderHook(() => usePrefillCarInfo(testNumberField, testCallback, false));

    expect(result.current.isCarInfoLoading).toBeFalsy();
  });

  describe('AND "prefillFieldsByCarNumber" is called', () => {
    it('AND carNumber is not valid, MUST do nothing', async () => {
      mockUseVehicleNumber.mockReturnValue({
        isNumberValid: false,
        currentNumber: currentNumberInValid,
      });

      const { result } = renderHook(() => usePrefillCarInfo(testNumberField, testCallback, false));

      await act(async () => {
        await result.current.prefillFieldsByCarNumber();
      });

      await waitForHookEffect();

      expect(mockTryLoadDataByCarNumberThunk).not.toHaveBeenCalled();
    });

    it('MUST do request to auto info service for car info data', async () => {
      const hash = 'hash';
      mockHashWasmMd5.mockReturnValue(hash);

      const { result } = renderHook(() => usePrefillCarInfo(testNumberField, testCallback, false));

      await act(async () => {
        await result.current.prefillFieldsByCarNumber();
      });

      await waitForHookEffect();

      expect(mockTryLoadDataByCarNumberThunk).toHaveBeenCalledWith(currentNumberValid);
    });

    describe('AND request is succeed', () => {
      it('MUST stop loading', async () => {
        const { result } = renderHook(() => usePrefillCarInfo(testNumberField, testCallback, false));

        act(() => {
          result.current.prefillFieldsByCarNumber();
        });

        expect(result.current.isCarInfoLoading).toBeTruthy();

        await waitForHookEffect();

        expect(result.current.isCarInfoLoading).toBeFalsy();
      });

      it('MUST call callback that was provided  from client code', async () => {
        const { result } = renderHook(() => usePrefillCarInfo(testNumberField, testCallback, false));

        act(() => {
          result.current.prefillFieldsByCarNumber();
        });

        await waitForHookEffect();

        expect(testCallback).toHaveBeenCalledWith(testDictionaries);
      });
    });
  });
});
