import type { ILocation } from '@sravni/types/lib/locations';

export const getLocationSeoParams = (location: ILocation) => ({
  id: location.id,
  name: location.name,
  nameLocative: location.nameLocative,
  route: location.route,
  alias: location.alias,
  latitude: location.latitude,
  longitude: location.longitude,
});
