import { createSelector } from 'reselect';

import { selectVehicleType } from 'entities/carInfo';
import { filterItemsByVehicleType } from 'entities/carInfo/lib/filterItemsByVehicleType';
import { previousCalculationsSelector } from 'entities/previousCalculations';

export const previousCalculationsDependOnCurrentVehicleTypeSelector = createSelector(
  previousCalculationsSelector,
  selectVehicleType,
  (calculations, currentVehicleType) => filterItemsByVehicleType(calculations, currentVehicleType),
);
