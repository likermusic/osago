import type { TVehicleCategories, TVehicleCategoriesLowerCase } from 'commonTypes/categories';

export const getVehicleTypeFromCategory = (
  vehicleCategory: TVehicleCategories | TVehicleCategoriesLowerCase | undefined,
): VehicleType => (String(vehicleCategory).toLowerCase() === 'a' ? 'motorcycle' : 'car');
