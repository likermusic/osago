import type { SliceStateFromReducer } from 'shared/types';

import type { calculationPreviousSlice } from './calculationPrevious.slice';

type TPrevCalculationState = SliceStateFromReducer<typeof calculationPreviousSlice>;

export const previousCalculationsSelector = (state: TPrevCalculationState) => state.previousCalculations.result;
