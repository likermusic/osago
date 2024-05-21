import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { StatePolicies } from '../types';

import { queries } from './policies.query';

const initialState: StatePolicies = {
  result: [],
};

export const policiesSlice = createSlice({
  name: 'policies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      queries.endpoints.getPolicies.matchFulfilled,
      (state, { payload }: PayloadAction<StatePolicies>) => ({
        ...state,
        ...payload,
      }),
    );
  },
});
