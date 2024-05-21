import { mockAppDispatch } from 'mocks/helpers';

import { submitAnketaThunk } from 'widgets/AnketaWidget/lib/submitAnketaThunk';

const mockTryWriteClientDataToMemory = jest.fn().mockName('tryWriteClientDataToMemory');
const mockRecalculateSteps = jest.fn().mockName('recalculateSteps');
const MockOnFullySubmitCallback = jest.fn().mockName('onFullySubmitCallback');

jest.mock('shared/lib/localStorageMethods/writeClientDataToMemory', () => ({
  tryWriteClientDataToMemory: (...arg: unknown[]) => mockTryWriteClientDataToMemory(...arg),
}));

jest.mock('../stepper', () => ({
  recalculateSteps: (...arg: unknown[]) => mockRecalculateSteps(...arg),
}));

describe('WHEN "submitAnketaThunk" is called', () => {
  it.each([true, false])('AND regardless of isDialog MUST always call tryWriteClientDataToMemory', async (isDialog) => {
    mockRecalculateSteps.mockReturnValue({ activeStep: {} });

    await submitAnketaThunk(isDialog, () => {})(mockAppDispatch, () => ({} as Store), undefined);

    expect(mockTryWriteClientDataToMemory).toHaveBeenCalled();
  });

  it('AND active step is exist AND isDialog - true MUST not call onFullySubmitCallback', async () => {
    mockRecalculateSteps.mockReturnValue({ activeStep: 1 });

    await submitAnketaThunk(true, MockOnFullySubmitCallback)(mockAppDispatch, () => ({} as Store), undefined);

    expect(MockOnFullySubmitCallback).not.toHaveBeenCalled();
  });

  it('AND active step is not exist AND isDialog - true MUST not call onFullySubmitCallback', async () => {
    mockRecalculateSteps.mockReturnValue({ activeStep: undefined });

    await submitAnketaThunk(true, MockOnFullySubmitCallback)(mockAppDispatch, () => ({} as Store), undefined);

    expect(MockOnFullySubmitCallback).not.toHaveBeenCalled();
  });

  it('AND active step is 0 AND isDialog - false MUST not call onFullySubmitCallback', async () => {
    mockRecalculateSteps.mockReturnValue({ activeStep: 0 });

    await submitAnketaThunk(true, MockOnFullySubmitCallback)(mockAppDispatch, () => ({} as Store), undefined);

    expect(MockOnFullySubmitCallback).not.toHaveBeenCalled();
  });

  it('AND active step is not exist AND isDialog - false MUST call onFullySubmitCallback', async () => {
    mockRecalculateSteps.mockReturnValue({ activeStep: undefined });

    await submitAnketaThunk(false, MockOnFullySubmitCallback)(mockAppDispatch, () => ({} as Store), undefined);

    expect(MockOnFullySubmitCallback).toHaveBeenCalled();
  });
});
