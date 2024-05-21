import { filterItemsByVehicleType } from '../filterItemsByVehicleType';

const ARRAY = [
  { id: 0, vehicleType: 'car' } as const,
  { id: 1, vehicleType: 'car' } as const,
  { id: 2, vehicleType: 'motorcycle' } as const,
  { id: 3, vehicleType: 'motorcycle' } as const,
  { id: 4, vehicleType: 'car' } as const,
];

const ARRAY_WITH_MOTORCYCLE_ONLY = [
  { id: 2, vehicleType: 'motorcycle' } as const,
  { id: 3, vehicleType: 'motorcycle' } as const,
];

describe('WHEN "filterItemsByVehicleType" is called', () => {
  it('AND current vehicle type is car MUST return the same array', () => {
    expect(filterItemsByVehicleType(ARRAY, 'car')).toEqual(ARRAY);
  });

  it('AND current vehicle type is motorcycle MUST return array with motorcycles only', () => {
    expect(filterItemsByVehicleType(ARRAY, 'motorcycle')).toEqual(ARRAY_WITH_MOTORCYCLE_ONLY);
  });
});
