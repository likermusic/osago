import type { TPerson } from 'shared/lib/comparePeopleWithFullNameAsObject';
import { comparePeopleWithFullNameAsObject } from 'shared/lib/comparePeopleWithFullNameAsObject';

import { selectAllDrivers } from '../model/drivers.selectors';
import type { DriversCommonFields } from '../types';

type TDriverWithId = Nullable<{ driverId: string; driverData: DriversCommonFields }>;
export const getDriverWithIdByDataThunk =
  (data: TPerson): ThunkResult<Promise<TDriverWithId>> =>
  async (_, getState) => {
    const drivers = selectAllDrivers(getState());
    // ищем драйвера в сторе по совпадению данных, если не нашли, то будет null
    const foundDriver = Object.entries(drivers).reduce<TDriverWithId>((acc, [driverId, driver]) => {
      if (driver.data && comparePeopleWithFullNameAsObject(driver.data, data)) {
        return { driverId, driverData: driver.data };
      }

      return acc;
    }, null);

    return foundDriver;
  };
