import { isDefined } from '@sravni/react-utils';

import { mapUserWithPassport } from 'shared/lib/normalizers/mapUser';

import { mapDriverExternal, type DriversEntityReducer } from 'entities/drivers';
import type { OwnerCommonFields } from 'entities/owner';

const mapDriversList = (drivers: DriversEntityReducer['multipleFormsData']) =>
  Object.values(drivers)
    .map((driver) => (driver.data ? mapDriverExternal(driver.data) : undefined))
    .filter(isDefined);

export const mapDrivers = (
  driversState: Pick<DriversEntityReducer, 'isMultiDrive' | 'multipleFormsData'>,
  owner: OwnerCommonFields,
) => ({
  driverAmount: driversState.isMultiDrive ? ('unlimited' as const) : ('limited' as const),
  drivers: driversState.isMultiDrive ? [mapUserWithPassport(owner)] : mapDriversList(driversState.multipleFormsData),
  unnamedDrivers: { age: 0, experience: 0 } as const,
});
