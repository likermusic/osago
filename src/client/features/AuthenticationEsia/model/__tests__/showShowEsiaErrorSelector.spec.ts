import { FormStepId } from 'shared/config/formStepId';

import { showShowEsiaErrorSelector } from '../AuthenticationEsia.selectors';

describe('WHEN "showShowEsiaErrorSelector" is called', () => {
  const generateState = (user: Record<string, unknown>): AppStore => ({
    user,
  });

  it('AND attempts count less then 2, MUST return false', () => {
    expect(
      showShowEsiaErrorSelector(FormStepId.Drivers)(
        generateState({
          esiaErrorCount: 1,
          esiaStep: FormStepId.Drivers,
        }),
      ),
    ).toBeFalsy();
  });

  describe('AND attempts count more then 2', () => {
    it('AND active form step is equal esia step, MUST return true', () => {
      expect(
        showShowEsiaErrorSelector(FormStepId.Drivers)(
          generateState({
            esiaErrorCount: 3,
            esiaStep: FormStepId.Drivers,
          }),
        ),
      ).toBeTruthy();
    });

    it('AND active form step is not equal esia step, MUST return false', () => {
      expect(
        showShowEsiaErrorSelector(FormStepId.Drivers)(
          generateState({
            esiaErrorCount: 3,
            esiaStep: FormStepId.Contacts,
          }),
        ),
      ).toBeFalsy();
    });
  });
});
