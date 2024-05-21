import { createSelector } from 'reselect';

import { selectVehicleType } from 'entities/carInfo';
import { filterItemsByVehicleType } from 'entities/carInfo/lib/filterItemsByVehicleType';
import { policiesResultSelector } from 'entities/policies';

export const policiesResultDependOnCurrentVehicleTypeSelector = createSelector(
  policiesResultSelector,
  selectVehicleType,
  (polices, currentVehicleType) => filterItemsByVehicleType(polices, currentVehicleType),
);
