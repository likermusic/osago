import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

import { formatDate } from 'commonUtils/formatters';

import type { IPolicyInfo } from '../types';

import { queries } from './policyInfo.query';

const recommendedStartDate = formatDate.toClientFromObject(dayjs().add(4, 'day'));

const initialState: IPolicyInfo = {
  lastPolicy: {},
  currentPolicy: {
    recommendedStartDate,
    currentStartDate: recommendedStartDate,
  },
};

export const policyInfoSlice = createSlice({
  name: 'policyInfo',
  initialState,
  extraReducers: (builder) => {
    builder.addMatcher(
      queries.endpoints.getPolicyInfo.matchFulfilled,
      (_, { payload }: PayloadAction<IPolicyInfo>) => ({
        isPolicyInfoFetching: false,
        ...payload,
      }),
    );
    builder.addMatcher(queries.endpoints.getPolicyInfo.matchRejected, (state) => ({
      ...state,
    }));
  },
  reducers: {
    /* дата ожидается в формате клиента DD.MM.YYYY см. src/client/shared/lib/formatters/formatDate/formatDate.ts*/
    setCurrentPolicyStartDate: (state, { payload }: PayloadAction<string>) => {
      state.currentPolicy.currentStartDate = payload;
    },
    setPolicyInfo: (state, { payload }: PayloadAction<IPolicyInfo>) => ({
      ...state,
      ...payload,
    }),
  },
});

export const { setCurrentPolicyStartDate, setPolicyInfo } = policyInfoSlice.actions;
