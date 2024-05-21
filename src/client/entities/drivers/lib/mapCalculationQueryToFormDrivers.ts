import type { TQuerySupportedForMapping } from 'shared/types/TQuerySupportedForMapping';

import type { DriversCommonFields } from 'entities/drivers';

import { mapDrivers } from './mapDrivers';

export const mapCalculationQueryToFormDrivers = (
  query: TQuerySupportedForMapping,
  isFullFilled?: boolean,
): { drivers: Form.MultipleFormsData<DriversCommonFields>; isMultiDrive: boolean } => {
  const { driversInfo } = query || {};
  const isMultiDrive = driversInfo?.driverAmount === 'unlimited';

  const drivers = mapDrivers(driversInfo?.drivers ?? null, isMultiDrive, query?.vehicleCategory, isFullFilled);

  return { drivers, isMultiDrive };
};
