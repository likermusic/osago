import type { VehicleType } from '@sravni/cosago-react-library/lib/types';

export const filterItemsByVehicleType = <T extends { vehicleType: VehicleType }>(
  items: T[],
  currentVehicleType: VehicleType,
): T[] => {
  if (currentVehicleType === 'motorcycle') {
    return items.filter(({ vehicleType }) => vehicleType === currentVehicleType);
  }

  return items;
};
