import { comparePeopleWithFullNameAsObject } from 'shared/lib/comparePeopleWithFullNameAsObject';

import type { DriversCommonFields } from '../types';

const EQUAL_FIELDS: Array<keyof DriversCommonFields> = [
  'experienceStartDate',
  'licenceNumber',
  'hasPreviousLicence',
  'prevLastName',
  'prevLicenceNumber',
];

export const isDriversEqualOrBothUndefined = (
  driver1: DriversCommonFields | undefined,
  driver2: DriversCommonFields | undefined,
) => {
  if (driver1 === undefined && driver2 === undefined) return true;
  if (driver1 === undefined || driver2 === undefined) return false;

  if (comparePeopleWithFullNameAsObject(driver1, driver2) && EQUAL_FIELDS.every((key) => driver1[key] === driver2[key]))
    return true;

  return false;
};
