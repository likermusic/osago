import { renderHook } from '@testing-library/react-hooks';

import { mockAppSelector } from 'mocks/helpers';

import { useLoadProlongation } from '../useLoadProlongation';

const mockUseGetPreviousCalculations = jest.fn();
jest.mock('entities/prolongation/model/prolongation.query', () => ({
  useGetPreviousCalculations: jest.fn().mockImplementation(() => mockUseGetPreviousCalculations()),
}));

describe('WHEN "useLoadProlongation" is called', () => {
  const onError = jest.fn();
  const start = jest.fn();

  beforeEach(() => {
    mockUseGetPreviousCalculations.mockReturnValue([start, { isLoading: false, isError: false, data: {} }]);
    mockAppSelector.mockReturnValue(false);
  });

  it('AND it is WL, MUST call errorCallback', () => {
    mockAppSelector.mockReturnValue(true);
    const { result } = renderHook(() => useLoadProlongation(onError));

    expect(result.current.isProlongationLoading).toBeFalsy();
    expect(result.current.isProlongationExist).toBeFalsy();
  });

  it('MUST return default state', () => {
    const { result } = renderHook(() => useLoadProlongation(onError));

    expect(result.current.isProlongationLoading).toBeFalsy();
    expect(result.current.isProlongationExist).toBeFalsy();
  });

  it('AND data was provided, MUST set "isProlongationExist" state', () => {
    mockUseGetPreviousCalculations.mockReturnValue([
      start,
      {
        isLoading: false,
        isError: false,
        data: {
          prolongationPolicyByCarNumber: {
            type: 'some',
          },
        },
      },
    ]);

    const { result } = renderHook(() => useLoadProlongation(onError));

    expect(result.current.isProlongationExist).toBeTruthy();
  });

  describe('AND data was provided with error', () => {
    beforeEach(() => {
      mockUseGetPreviousCalculations.mockReturnValue([
        start,
        {
          isLoading: false,
          isError: true,
          data: null,
        },
      ]);
    });

    it('MUST drop "isProlongationExist" state', () => {
      const { result } = renderHook(() => useLoadProlongation(onError));

      expect(result.current.isProlongationExist).toBeFalsy();
    });

    it('MUST call "onErrorCallback"', () => {
      renderHook(() => useLoadProlongation(onError));

      expect(onError).toHaveBeenCalled();
    });
  });
});
