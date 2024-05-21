import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { CrossCalculationsState } from '../types';

import { queries } from './cross.query';

const initialState: CrossCalculationsState = {
  calculation: {
    hash: '',
    status: '',
    products: [],
    propositions: [],
  },
  orders: {
    hash: '',
    status: 'none',
    paymentUrl: '',
    message: '',
  },
};

export const crossSlice = createSlice({
  name: 'cross',
  initialState,
  reducers: {
    resetCrossOrdersResult: (state) => {
      state.orders = {
        hash: '',
        status: 'none',
        paymentUrl: '',
        message: '',
      };
    },
    setErrorCalculationStatus: (state) => {
      state.calculation.status = 'error';
    },
    setErrorOrdersStatus: (state) => {
      state.orders.status = 'error';
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      queries.endpoints.getCrossCalculations.matchFulfilled,
      (state, { payload }: PayloadAction<CrossCalculationsState['calculation']>) => ({
        ...state,
        calculation: payload,
      }),
    );
    builder.addMatcher(
      queries.endpoints.getCrossOrders.matchFulfilled,
      (state, { payload }: PayloadAction<CrossCalculationsState['orders']>) => ({
        ...state,
        orders: payload,
      }),
    );
  },
});
