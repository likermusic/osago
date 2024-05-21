import type { TMapPolicyDataMapper } from '../types';

import { normalizeAuto } from './normalizeAuto';
import { normalizeDrivers } from './normalizeDrivers';
import { normalizeDriversCount } from './normalizeDriversCount';
import { normalizePolicyEndDate } from './normalizePolicyEndDate';

export const mapAuthorizedData: TMapPolicyDataMapper = (params) => {
  const { brandName, modelName, vehicleYear, policyEndDate, drivers, userName } = params || {};

  return {
    sravniProlongation: [
      { title: userName ?? '', icon: 'userName' },
      {
        title: normalizeAuto(brandName, modelName, vehicleYear),
        icon: 'auto',
      },
      { title: normalizePolicyEndDate(policyEndDate), icon: 'policyEndDate' },
    ],
    lastSearch: [
      { title: normalizeDriversCount(drivers?.length), subtitle: normalizeDrivers(drivers), icon: 'drivers' },
      {
        title: normalizeAuto(brandName, modelName, vehicleYear),
        icon: 'auto',
      },
    ],
    newShortProlongation: [],
    shortProlongation: [],
  };
};
