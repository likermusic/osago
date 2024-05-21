import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { mapPropositionStatus } from '../lib';
import type { PropositionCalculationsState, ITransformedGetMultiCalculations } from '../types';

import { getCalculationsHash } from './propositionCalculations.query';

export const initialState: PropositionCalculationsState = {
  propositions: [],
  orderInfo: null,

  sort: 'priceASC',
  calculationHash: null,
  propositionStatus: 'initial',

  driversWithKbm: [],
  multiDriveWithKbm: undefined,

  isShowPromoField: false,
  promocodeAlerts: [],
  promocode: '',

  alerts: [],
};

export const propositionCalculationsSlice = createSlice({
  name: 'propositionCalculations',
  initialState,
  reducers: {
    setPropositionCalculation: (state, { payload }: PayloadAction<ITransformedGetMultiCalculations>) => ({
      ...state,
      ...payload,
      // Сбрасываем промик, если он изначально был не валидный(за валидность отвечает promocodeAlerts)
      promocode: state.isShowPromoField && !payload.promocodeAlerts?.length ? null : state.promocode,
    }),
    setPropositionStatus: (state, { payload }: PayloadAction<PropositionCalculationsState['propositionStatus']>) => {
      state.propositionStatus = payload;
    },
    setSort: (state, { payload }: PayloadAction<PropositionCalculationsState['sort']>) => {
      state.sort = payload;
    },

    updateStoreWhenCalculationPollingFinishedByTime: (state) => {
      // обновление статуса
      state.propositionStatus = mapPropositionStatus(state.propositions.length, !!state.orderInfo, true);
    },

    resetPropositionCalculation: (state) => ({
      propositions: initialState.propositions,
      orderInfo: initialState.orderInfo,
      calculationHash: initialState.calculationHash,
      sort: initialState.sort,
      propositionStatus: initialState.propositionStatus,

      driversWithKbm: initialState.driversWithKbm,
      multiDriveWithKbm: initialState.multiDriveWithKbm,

      isShowPromoField: initialState.isShowPromoField,

      promocodeAlerts: initialState.promocodeAlerts,
      promocode: state.promocode,

      alerts: initialState.alerts,
    }),
    setPromocode: (state, { payload }: PayloadAction<PropositionCalculationsState['promocode']>) => {
      state.promocode = payload;
    },
  },
  extraReducers: (builder) => {
    // создание хеша расчета
    builder.addMatcher(getCalculationsHash.matchFulfilled, (state, { payload }) => ({
      ...state,
      ...payload,
    }));
    builder.addMatcher(getCalculationsHash.matchRejected, (state) => ({
      ...state,
      propositionStatus: 'error',
    }));
  },
});

export const {
  setPropositionCalculation,
  setPromocode,
  updateStoreWhenCalculationPollingFinishedByTime,
  resetPropositionCalculation,
  setPropositionStatus,
} = propositionCalculationsSlice.actions;
