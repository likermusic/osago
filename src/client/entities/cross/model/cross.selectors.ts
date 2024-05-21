import type { SliceStateFromReducer } from 'shared/types';

import type { crossSlice } from './cross.slice';

type TCrossState = SliceStateFromReducer<typeof crossSlice>;

export const crossCalculationsSelector = (state: TCrossState) => state.cross.calculation;
export const crossOrdersSelector = (state: TCrossState) => state.cross.orders;
