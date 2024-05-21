import type { SliceStateFromReducer } from 'shared/types';

import type { locationSlice } from './location.slice';

type TLocationState = SliceStateFromReducer<typeof locationSlice>;

export const centersSelector = (state: TLocationState) => state.locations.centers;
export const currentLocationSelector = (state: TLocationState) => state.locations.currentLocation;
