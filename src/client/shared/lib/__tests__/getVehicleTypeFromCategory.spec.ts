import { getVehicleTypeFromCategory } from 'shared/lib/getVehicleTypeFromCategory';

describe('WHEN "getVehicleTypeFromCategory" is called', () => {
  it.each([undefined, null, ''])('AND vehicle category provided as falsy value MUST return car ', (vehicleCategory) => {
    expect(getVehicleTypeFromCategory(vehicleCategory as unknown as undefined)).toBe('car');
  });

  it.each(['b', 'B', 'c', 'C', 'd', 'D', 'e', 'E'] as const)(
    'AND vehicle category provided as car categories AND independent on registry MUST return car',
    (vehicleCategory) => {
      expect(getVehicleTypeFromCategory(vehicleCategory)).toBe('car');
    },
  );

  it.each(['a', 'A'] as const)(
    'AND vehicle category provided as motorcycle categories AND independent on registry MUST return motorcycle',
    (vehicleCategory) => {
      expect(getVehicleTypeFromCategory(vehicleCategory)).toBe('motorcycle');
    },
  );
});
