import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { PurchasedPolicyState } from '../types';

import { queries } from './purchasedPolicy.query';

const initialState: PurchasedPolicyState = {
  info: null,
  policyLink: {
    policyLink: null,
    policyNumber: '',
    archiveLink: null,
  },
};

export const purchasedPolicySlice = createSlice({
  name: 'purchasedPolicy',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      queries.endpoints.getPurchasedPolicyInfo.matchFulfilled,
      (state, { payload }: PayloadAction<PurchasedPolicyState['info']>) => ({
        ...state,
        info: payload,
      }),
    );
    builder.addMatcher(
      queries.endpoints.getPolicyLink.matchFulfilled,
      (state, { payload }: PayloadAction<PurchasedPolicyState['policyLink']>) => ({
        ...state,
        policyLink: payload,
      }),
    );
  },
});
