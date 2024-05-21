import { createSelector } from 'reselect';

import { isShowPromoFieldSelector, promocodeAlertsSelector, promocodeSelector } from 'entities/propositionCalculations';

import { getPromocodeStatus } from '../lib/getPromocodeStatus';

export const promocodeStatusSelector = createSelector(
  promocodeAlertsSelector,
  promocodeSelector,
  isShowPromoFieldSelector,
  getPromocodeStatus,
);
