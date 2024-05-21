import { mockAppDispatch } from 'mocks/index';

import { updateFormStoreThunk } from '../updateFormStoreThunk';

describe('WHEN "useRestoreCalculationQueryByHash" is mounted', () => {
  it('MUST update all form state by query', async () => {
    updateFormStoreThunk({})(mockAppDispatch, () => ({} as Store), undefined);

    expect(mockAppDispatch).toBeCalledTimes(5);
  });

  it('MUST update all form state by query if has save', async () => {
    updateFormStoreThunk({ save: {} })(mockAppDispatch, () => ({} as Store), undefined);

    expect(mockAppDispatch).toBeCalledTimes(6);
  });

  it('MUST update all form state by query if has benefitCode', async () => {
    updateFormStoreThunk({ benefitCode: 'adv' })(mockAppDispatch, () => ({} as Store), undefined);

    expect(mockAppDispatch).toBeCalledTimes(6);
  });
});
