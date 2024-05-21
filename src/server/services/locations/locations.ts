import {
  findLocationByAlias,
  findLocationByRoute,
  findLocationsByIds,
} from '@sravni/package-server-utils-insurance/lib/services';
import withMemoryCache from '@sravni/server-utils/lib/utils/withMemoryCache';

import type { locations } from 'commonTypes/api/locations';

import { config } from '../../constants/config';
import { requestWithoutTokenGet } from '../../utils/api/api';

export const findAllLocationsByProvidedIds = findLocationsByIds(config.LOCATIONS);
export const findLocationByRouteId = findLocationByRoute(config.LOCATIONS);
export const findRouteByAlias = findLocationByAlias(config.LOCATIONS);

export const findRegionalCenters = async (): Promise<locations.GetLocations> => {
  const { data } = await requestWithoutTokenGet<locations.GetLocations>(
    `${config.APIGATEWAY}/location/v1.0/locations/regional-centers/`,
  );

  return data;
};
export const findRegionalCentersWithCache = withMemoryCache(findRegionalCenters, {
  fnKey: 'location-regional-centers',
});
