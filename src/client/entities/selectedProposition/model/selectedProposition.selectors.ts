import type { SliceStateFromReducer } from 'shared/types';

import type { selectedPropositionSlice } from './selectedProposition.slice';

type SelectedPropositionState = SliceStateFromReducer<typeof selectedPropositionSlice>;

export const selectedPropositionSelector = (state: SelectedPropositionState) => state.selectedProposition;

export const selectedPropositionPriceSelector = (state: SelectedPropositionState) =>
  selectedPropositionSelector(state)?.price;
