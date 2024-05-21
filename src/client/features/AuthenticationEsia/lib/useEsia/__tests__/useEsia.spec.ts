import { renderHook } from '@testing-library/react-hooks';

import { generateProfilePersonMock, mockAppSelector } from 'mocks/helpers';

import { EXPERIMENT_B_VARIANT } from '../../../AuthenticationEsia.config';
import { useEsia } from '../useEsia';

const mockUpdateFormDataByEsiaPersonThunk = jest.fn();
jest.mock('../../thunks/updateFormDataByEsiaPersonThunk', () => ({
  updateFormDataByEsiaPersonThunk: (step: string) => mockUpdateFormDataByEsiaPersonThunk(step),
}));

const mockUseAbTestVariant = jest.fn();
jest.mock('entities/appConfig', () => ({
  useAbTestVariant: () => mockUseAbTestVariant(),
}));

describe('WHEN "useEsia" is mounted', () => {
  const generateState = (isFromEsia: boolean): AppStore =>
    isFromEsia
      ? generateProfilePersonMock('Иванов Иван Иванович', {
          isFromEsia: true,
        })
      : null;

  it('MUST try to update form', () => {
    mockUseAbTestVariant.mockReturnValue(EXPERIMENT_B_VARIANT);
    mockAppSelector.mockReturnValueOnce(generateState(true)).mockReturnValueOnce(false);

    const { result } = renderHook(() => useEsia());
    result.current();

    expect(mockUpdateFormDataByEsiaPersonThunk).toHaveBeenCalled();
  });

  it('AND it is wl, MUST do nothing', () => {
    mockUseAbTestVariant.mockReturnValue(EXPERIMENT_B_VARIANT);
    mockAppSelector.mockReturnValueOnce(generateState(true)).mockReturnValueOnce(true);

    const { result } = renderHook(() => useEsia());
    result.current();

    expect(mockUpdateFormDataByEsiaPersonThunk).not.toHaveBeenCalled();
  });

  it('AND it is not B variant, MUST do nothing', () => {
    mockUseAbTestVariant.mockReturnValue('0');
    mockAppSelector.mockReturnValue(generateState(true));

    const { result } = renderHook(() => useEsia());
    result.current();

    expect(mockUpdateFormDataByEsiaPersonThunk).not.toHaveBeenCalled();
  });
});
