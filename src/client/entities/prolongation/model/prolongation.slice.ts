import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { TFoundedProlongationPolicy } from '../types';

import { queries } from './prolongation.query';

const initialState: TFoundedProlongationPolicy = {
  prolongationPolicyByCarNumber: null,
};

export const prolongationSlice = createSlice({
  name: 'prolongation',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      queries.endpoints.findProlongationByCarNumber.matchFulfilled,
      (_, { payload }: PayloadAction<TFoundedProlongationPolicy>) => payload,
    );
  },
});
