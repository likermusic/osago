import { createSelector } from 'reselect';

import { FlowType } from 'shared/config/FlowType';

import { hasProlongationPoliciesSelector } from 'entities/policies';
import { isUserLoggedInSelector } from 'entities/user';

import { policiesResultDependOnCurrentVehicleTypeSelector } from 'features/Prolongation';

export const showBackToCalculationSelector = (flowType: FlowType) =>
  createSelector(isUserLoggedInSelector, hasProlongationPoliciesSelector, (isLoggedIn, isHasProlongationPolicy) => {
    if (!isLoggedIn) {
      return false;
    }

    if (flowType === FlowType.Calculation) {
      return true;
    }

    return !isHasProlongationPolicy;
  });

export const isHasProlongationPolicesSelector = createSelector(
  isUserLoggedInSelector,
  policiesResultDependOnCurrentVehicleTypeSelector,
  (isLogged, policiesResultDependOnCurrentVehicleType) => isLogged && !!policiesResultDependOnCurrentVehicleType.length,
);
