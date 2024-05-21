import { createSelector } from 'reselect';

import { comparePeopleWithFullNameAsObject } from 'shared/lib/comparePeopleWithFullNameAsObject';

import { selectDrivers } from 'entities/drivers';
import { selectInsurerDataOrDefaults } from 'entities/insurer';
import {
  driversWithKbmSelector,
  propositionStatusSelector,
  multiDriveKbmSelector,
} from 'entities/propositionCalculations';

import { getKbmLoadingStatus } from '../lib/getKbmLoadingStatus';
import { getMaxKbm } from '../lib/getMaxKbm';
import type { IKbmDiscountDriver } from '../types';

export const kbmDiscountDriversSelector = createSelector(
  selectDrivers,
  driversWithKbmSelector,
  selectInsurerDataOrDefaults,
  ({ multipleFormsData }, driversWithKbm, insurer): IKbmDiscountDriver[] => {
    const clientDrivers = Object.entries(multipleFormsData).map(([key, { data: driver }]) => ({
      fullName: driver?.fullName?.value.toString(),
      isInsurer: driver && comparePeopleWithFullNameAsObject(insurer, driver),
      isSelected: true,
      keyInDrivers: key,
    }));

    return driversWithKbm
      .map(({ kbm, fullName }) => {
        const clientDriver = clientDrivers.find((it) => {
          if (it.fullName)
            return it.fullName.toUpperCase().includes(fullName) || fullName.includes(it.fullName.toUpperCase());

          return false;
        });

        return {
          ...clientDriver,
          kbm,
        };
      })
      .filter((drv) => !!drv.fullName) as IKbmDiscountDriver[];
  },
);

export const maxDriversKbmSelector = createSelector(
  kbmDiscountDriversSelector,
  multiDriveKbmSelector,
  (drivers, multidriveKbm) => getMaxKbm(drivers) || multidriveKbm,
);

export const kbmLoadingStatusSelector = createSelector(
  propositionStatusSelector,
  driversWithKbmSelector,
  multiDriveKbmSelector,
  getKbmLoadingStatus,
);

export const KbmDiscountModalSelectors = {
  maxDriversKbmSelector,
  kbmLoadingStatusSelector,
};
