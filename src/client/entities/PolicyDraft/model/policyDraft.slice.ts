import { createSlice } from '@reduxjs/toolkit';

import type { IPolicyDraftState } from '../types';

import { getPoliciesDrafts } from './policyDraft.query';

export const initialState: IPolicyDraftState = {
  policyUrl: null,
  upsaleUrl: null,
  upsaleRulesUrl: null,
};

export const policyDraftSlice = createSlice({
  name: 'policyDraft',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(getPoliciesDrafts.matchFulfilled, (state, { payload }) => ({
      ...state,
      ...payload,
    }));
  },
});
