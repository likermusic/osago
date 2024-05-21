import { joinFullName } from '@sravni/cosago-react-library/lib/utils';

import type { PropositionCalculations } from 'commonTypes/api/propositionCalculations';

import type { PropositionCalculationsState } from '../../types';

export const mapDriversWithKbm = (
  drivers: PropositionCalculations.GetCalculations['kbmInfo'],
): PropositionCalculationsState['driversWithKbm'] => {
  if (!drivers?.drivers || !Array.isArray(drivers.drivers)) return [];

  return drivers.drivers.map((driver) => ({
    fullName: joinFullName(driver.lastName ?? undefined, driver.firstName ?? undefined, driver.middleName ?? undefined),
    kbm: driver.kbm ?? null,
  }));
};
