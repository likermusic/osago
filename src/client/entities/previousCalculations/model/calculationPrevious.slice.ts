import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { previousCalculationsState } from '../types';

import { queries } from './calculationsPrevious.query';

const initialState: previousCalculationsState = {
  result: [],
};

export const calculationPreviousSlice = createSlice({
  name: 'previousCalculations',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      queries.endpoints.getPreviousCalculations.matchFulfilled,
      (state, { payload }: PayloadAction<previousCalculationsState>) => ({
        ...state,
        ...payload,
      }),
    );
  },
});
