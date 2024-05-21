import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { RestoredQueryReducer } from '../types';

const initialState: RestoredQueryReducer = {
  data: null,
  shouldResetAnketa: true,
};

export const restoredQuerySlice = createSlice({
  name: 'restoredQuery',
  initialState,
  reducers: {
    setRestoredQueryData: (state, { payload }: PayloadAction<RestoredQueryReducer['data']>) => {
      state.data = payload;
    },
    setShouldResetAnketa: (state, { payload }: PayloadAction<RestoredQueryReducer['shouldResetAnketa']>) => {
      state.shouldResetAnketa = payload;
    },
  },
});

export const { setRestoredQueryData, setShouldResetAnketa } = restoredQuerySlice.actions;
