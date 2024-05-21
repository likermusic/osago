import type { SliceStateFromReducer } from 'shared/types';

import type { restoredQuerySlice } from './restoredQuery.slice';

export type TCarInfoState = SliceStateFromReducer<typeof restoredQuerySlice>;

export const restoredQuerySelector = (state: TCarInfoState) => state.restoredQuery;
export const shouldResetAnketaSelector = (state: TCarInfoState) => state.restoredQuery.shouldResetAnketa;
