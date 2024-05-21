import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { SelectedPropositionState } from '../types/types';

import { restoreSelectedPropositionInfo } from './selectedProposition.query';

export const initialState: SelectedPropositionState = {
  price: null,
  productId: null,
  activeCompanyId: null,
  searchId: null,
  isDataChangedOnSummary: false,
};

export const selectedPropositionSlice = createSlice({
  name: 'selectedProposition',
  initialState,
  reducers: {
    setSelectedProposition: (state, { payload }: PayloadAction<SelectedPropositionState>) => ({
      ...state,
      ...payload,
      isDataChangedOnSummary: false,
    }),
    updateSelectedPropositionPartial: (state, { payload }: PayloadAction<Partial<SelectedPropositionState>>) => ({
      ...state,
      ...payload,
    }),
    updateSelectedProposition: (
      state,
      {
        payload,
      }: PayloadAction<Pick<SelectedPropositionState, 'price' | 'productId' | 'activeCompanyId' | 'searchId'>>,
    ) => ({
      ...state,
      price: payload.price,
      productId: payload.productId,
      activeCompanyId: payload.activeCompanyId,
      searchId: payload.searchId,
      isDataChangedOnSummary: false,
    }),
  },
  extraReducers: (builder) => {
    builder.addMatcher(restoreSelectedPropositionInfo.matchFulfilled, (state, { payload }) => ({
      ...state,
      ...payload,
    }));
  },
});

export const { setSelectedProposition, updateSelectedPropositionPartial, updateSelectedProposition } =
  selectedPropositionSlice.actions;
