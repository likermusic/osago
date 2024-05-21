import { renderHook } from '@testing-library/react-hooks';

import { mockAppSelector } from 'mocks/helpers';

import { accountPhoneSelector } from 'entities/user';

import { lotteryNameSelector } from '../../model/RaffleRegistration.selectors';
import type { TRaffleRegistationFields } from '../../types';
import { useSubmitEnterPolicyByYourselfStep } from '../useSubmitEnterPolicyByYourselfStep';

const mockUseFormContext = jest.fn();
const mockUseLazyRegisterUserInRaffle = jest.fn();
const mockValidation = jest.fn();
const mockValidSync = jest.fn();

jest.mock('@sravni/cosago-react-library/lib/hooks', () => ({
  useFormContext: jest.fn().mockImplementation(() => mockUseFormContext()),
}));

jest.mock('../../model/RaffleRegistration.query', () => ({
  useLazyRegisterUserInRaffle: jest.fn().mockImplementation(() => mockUseLazyRegisterUserInRaffle()),
}));

jest.mock('../../model/RaffleRegistration.validation', () => ({
  enterPolicyByYourselfStepValidation: jest.fn().mockImplementation(() => mockValidation()),
}));

const mockHandleSubmit = jest.fn();

const getHandleSubmitMock =
  (fields: Omit<TRaffleRegistationFields, 'policiesAutocomplete'>) =>
  (cb: (data: TRaffleRegistationFields) => void) => {
    cb({
      policiesAutocomplete: null,
      ...fields,
    });
    return mockHandleSubmit;
  };

describe('WHEN useSubmitEnterPolicyByYourselfStep is called', () => {
  const mockSetError = jest.fn();
  const mockRegisterUserInRaffle = jest.fn().mockReturnValue(() => ({ data: {} }));
  const mockOnSuccessSubmit = jest.fn();
  const isLoadingMock = false;
  const mockLotteryName = 'TestLotteryName';
  const mockPhone = '1234567890';
  const mockPolicyNumber = '123';
  const mockProductType = 'Osago';

  beforeAll(() => {
    mockUseFormContext.mockReturnValue({
      setError: mockSetError,
      handleSubmit: getHandleSubmitMock({
        policyNumber: mockPolicyNumber,
        policyType: {
          label: '',
          value: mockProductType,
        },
      }),
    });
    mockValidation.mockReturnValue({ validateSync: mockValidSync });
    mockUseLazyRegisterUserInRaffle.mockReturnValue([mockRegisterUserInRaffle, { isLoading: isLoadingMock }]);
    mockAppSelector.mockImplementation((selector) => {
      if (selector === lotteryNameSelector) return mockLotteryName;
      if (selector === accountPhoneSelector) return mockPhone;
    });
  });

  describe('AND policyNumber AND policyType.value are exist', () => {
    beforeEach(async () => {
      const { result } = renderHook(() => useSubmitEnterPolicyByYourselfStep());

      await result.current[0](mockOnSuccessSubmit);
    });

    it('MUST call enterPolicyByYourselfStepValidation', () => {
      expect(mockValidation).toHaveBeenCalledTimes(1);
    });

    it('MUST call registerUserInRaffle with correct data on successful submit', () => {
      expect(mockRegisterUserInRaffle).toHaveBeenCalledTimes(1);
      expect(mockRegisterUserInRaffle).toHaveBeenCalledWith({
        policyNumber: mockPolicyNumber,
        lotteryName: mockLotteryName,
        isRulesAccepted: true,
        phone: mockPhone,
        productType: mockProductType,
      });
    });
  });

  it('AND registerUserInRaffle return result.error MUST call setError with correct message on error at exact field', async () => {
    const error = 'Проблемы';
    const { result } = renderHook(() => useSubmitEnterPolicyByYourselfStep());

    mockRegisterUserInRaffle.mockReturnValue({ data: { error } });

    await result.current[0](mockOnSuccessSubmit);

    expect(mockValidation).toHaveBeenCalledTimes(1);
    expect(mockSetError).toHaveBeenCalledTimes(1);
    expect(mockSetError).toHaveBeenCalledWith('policyNumber', {
      message: error,
    });
  });

  it.each([
    [
      { path: 'policyNumber', message: '123' },
      { path: 'policyType', message: '123' },
    ],
  ])(
    'AND enterPolicyByYourselfStepValidation call error MUST call setError with correct message on error at exact field',
    async (error) => {
      const { result } = renderHook(() => useSubmitEnterPolicyByYourselfStep());

      mockValidSync.mockImplementation(() => {
        throw error;
      });
      await result.current[0](mockOnSuccessSubmit);

      expect(mockValidation).toHaveBeenCalledTimes(1);
      expect(mockSetError).toHaveBeenCalledTimes(1);
      expect(mockSetError).toHaveBeenCalledWith(error.path, {
        message: error.message,
      });
    },
  );
});
