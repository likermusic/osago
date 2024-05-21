import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { StateLocation } from '../types';

const initialState: StateLocation = {
  centers: [],
  currentLocation: {
    id: 83,
    name: 'Москва',
    fullName: 'г Москва',
    nameLocative: 'в Москве',
    nameGenitive: 'Москвы',
    route: '6.83.',
    alias: 'moskva',
    localityType: 'город',
    shortLocationType: 'г.',
    latitude: 55.753676,
    longitude: 37.619899,
  },
};

export const locationSlice = createSlice({
  name: 'locations',
  initialState,
  reducers: {
    setCurrentLocation: (state, { payload }: PayloadAction<ILocation>) => {
      state.currentLocation = payload;
    },
    setLocations: (state, { payload }: PayloadAction<ILocation[]>) => {
      state.centers = payload;
    },
  },
});
