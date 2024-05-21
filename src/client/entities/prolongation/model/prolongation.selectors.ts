import { createSelector } from 'reselect';

import type { SliceStateFromReducer } from 'shared/types';

import { normalizeProlongationData } from '../lib/normalizeProlongationData';

import type { prolongationSlice } from './prolongation.slice';

type TProlongationState = SliceStateFromReducer<typeof prolongationSlice>;

export const prolongationResultSelector = (state: TProlongationState) =>
  state.prolongation.prolongationPolicyByCarNumber;

export const normalizedProlongationInfoSelector = createSelector(prolongationResultSelector, (data) =>
  data && data.type !== 'newShortProlongation' ? normalizeProlongationData(data) : null,
);
