import { FlowType } from 'shared/config/FlowType';

import { showBackToCalculationSelector } from '../CalculationWidget.selectors';

describe('WHEN "showBackToCalculationSelector" is called', () => {
  it('AND user is not logged in, MUST return false', () => {
    expect(
      showBackToCalculationSelector(FlowType.Calculation)({
        user: {
          esiaErrorCount: 0,
          isLoggedIn: false,
          restoredAccount: null,
        },
        policies: {
          result: [],
        },
      }) as AppStore,
    ).toBeFalsy();
  });

  it('AND it is calculation flow, MUST return true', () => {
    expect(
      showBackToCalculationSelector(FlowType.Calculation)({
        user: {
          esiaErrorCount: 0,
          isLoggedIn: true,
          restoredAccount: null,
        },
        policies: {
          result: [],
        },
      }) as AppStore,
    ).toBeTruthy();
  });

  describe('AND it is prolongation flow', () => {
    it('AND user has a policy for prolongation, MUST return false', () => {
      expect(
        showBackToCalculationSelector(FlowType.Prolongation)({
          user: {
            esiaErrorCount: 0,
            isLoggedIn: true,
            restoredAccount: null,
          },
          policies: {
            // @ts-ignore
            result: [{}],
          },
        }) as AppStore,
      ).toBeFalsy();
    });

    it('AND user does not have a policy for prolongation, MUST return true', () => {
      expect(
        showBackToCalculationSelector(FlowType.Calculation)({
          user: {
            esiaErrorCount: 0,
            isLoggedIn: true,
            restoredAccount: null,
          },
          policies: {
            // @ts-ignore
            result: [{}],
          },
        }) as AppStore,
      ).toBeTruthy();
    });
  });
});
