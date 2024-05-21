import { createSelector } from 'reselect';

import type { SliceStateFromReducer } from 'shared/types';

// eslint-disable-next-line boundaries/element-types
import { sortPropositions } from '../lib/helpers/sortPropositions';

import type { propositionCalculationsSlice } from './propositionCalculations.slice';

type PropositionCalculationsState = SliceStateFromReducer<typeof propositionCalculationsSlice>;

export const propositionCalculationsSelector = (state: PropositionCalculationsState) => state.propositionCalculations;
export const propositionCalculationAlertsSelector = (state: PropositionCalculationsState) =>
  state.propositionCalculations.alerts;
export const successPropositionsSelector = (state: PropositionCalculationsState) =>
  state.propositionCalculations.propositions;

// расчет
export const sortedSuccessPropositionsSelector = (state: PropositionCalculationsState) =>
  sortPropositions(state.propositionCalculations.propositions.slice(), state.propositionCalculations.sort);

export const propositionStatusSelector = (state: PropositionCalculationsState) =>
  state.propositionCalculations.propositionStatus;
export const propositionCalculationsHashSelector = (state: PropositionCalculationsState) =>
  state.propositionCalculations.calculationHash;
export const driversWithKbmSelector = (state: PropositionCalculationsState) =>
  state.propositionCalculations.driversWithKbm;

// кбм для мультидрайва
export const multiDriveKbmSelector = (state: PropositionCalculationsState) =>
  state.propositionCalculations.multiDriveWithKbm;

export const orderInfoSelector = (state: PropositionCalculationsState) => state.propositionCalculations.orderInfo;

export const isOrderExistSelector = createSelector(orderInfoSelector, (order) => !!order);

export const propositionsSortSelector = (state: PropositionCalculationsState) => state.propositionCalculations.sort;

export const isShowPromoFieldSelector = (state: PropositionCalculationsState) =>
  state.propositionCalculations.isShowPromoField;

export const promocodeAlertsSelector = (state: PropositionCalculationsState) =>
  state.propositionCalculations.promocodeAlerts;

export const promocodeSelector = (state: PropositionCalculationsState) => state.propositionCalculations.promocode;

export const isPropositionEmptySelector = createSelector(
  isOrderExistSelector,
  sortedSuccessPropositionsSelector,
  (isOrderExist, propositions) => !isOrderExist && propositions.length === 0,
);
