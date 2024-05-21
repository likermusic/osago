import { renderHook } from '@testing-library/react-hooks';

import { mockAppSelector } from 'mocks/helpers';

import { FieldErrors } from 'shared/lib/fields';

import { accountPhoneSelector } from 'entities/user';

import { lotteryNameSelector } from '../../model/RaffleRegistration.selectors';
import type { TRaffleRegistationFields } from '../../types';
import { useSubmitChoosePolicyStep } from '../useSubmitChoosePolicyStep';

const mockUseFormContext = jest.fn();
const mockUseLazyRegisterUserInRaffle = jest.fn();

jest.mock('@sravni/cosago-react-library/lib/hooks', () => ({
  useFormContext: jest.fn().mockImplementation(() => mockUseFormContext()),
}));

jest.mock('../../model/RaffleRegistration.query', () => ({
  useLazyRegisterUserInRaffle: jest.fn().mockImplementation(() => mockUseLazyRegisterUserInRaffle()),
}));

const mockHandleSubmit = jest.fn();

const getHandleSubmitMock =
  (policiesAutocomplete: TRaffleRegistationFields['policiesAutocomplete']) =>
  (cb: (data: TRaffleRegistationFields) => void) => {
    cb({
      policiesAutocomplete,
      policyNumber: '',
      policyType: null,
    });
    return mockHandleSubmit;
  };

describe('WHEN useSubmitChoosePolicyStep is called', () => {
  const mockSetError = jest.fn();
  const mockRegisterUserInRaffle = jest.fn().mockReturnValue(() => ({ data: {} }));
  const mockOnSuccessSubmit = jest.fn();
  const isLoadingMock = false;
  const mockLotteryName = 'TestLotteryName';
  const mockPhone = '1234567890';

  beforeEach(() => {
    mockUseLazyRegisterUserInRaffle.mockReturnValue([mockRegisterUserInRaffle, { isLoading: isLoadingMock }]);
    mockAppSelector.mockImplementation((selector) => {
      if (selector === lotteryNameSelector) return mockLotteryName;
      if (selector === accountPhoneSelector) return mockPhone;
    });
  });

  it('AND data.value is exist MUST call registerUserInRaffle with correct data on successful submit', async () => {
    const mockPolicyNumber = '123';
    const mockOrderId = '321';
    const mockProductType = 'osago';
    mockUseFormContext.mockReturnValue({
      setError: mockSetError,
      handleSubmit: getHandleSubmitMock({
        value: mockPolicyNumber,
        label: '',
        orderId: mockOrderId,
        productType: mockProductType,
      }),
    });

    const { result } = renderHook(() => useSubmitChoosePolicyStep());

    await result.current[0](mockOnSuccessSubmit);

    expect(mockRegisterUserInRaffle).toHaveBeenCalledTimes(1);
    expect(mockRegisterUserInRaffle).toHaveBeenCalledWith({
      policyNumber: mockPolicyNumber,
      lotteryName: mockLotteryName,
      orderId: mockOrderId,
      isRulesAccepted: true,
      phone: mockPhone,
      productType: mockProductType,
    });
  });

  it('AND data is not exist MUST call setError with correct message on error at policiesAutocomplete field', async () => {
    mockUseFormContext.mockReturnValue({
      setError: mockSetError,
      handleSubmit: getHandleSubmitMock(null),
    });
    const { result } = renderHook(() => useSubmitChoosePolicyStep());

    await result.current[0](mockOnSuccessSubmit);

    expect(mockSetError).toHaveBeenCalledTimes(1);
    expect(mockSetError).toHaveBeenCalledWith('policiesAutocomplete', {
      message: FieldErrors.requiredError,
    });
  });
});
