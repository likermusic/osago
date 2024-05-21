import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { TRaffleRegistrationState } from '../types';

import { getPoliciesForRaffle, registerUserInRaffle } from './RaffleRegistration.query';

export const RaffleRegistrationInitialState: TRaffleRegistrationState = {
  policies: [],
  isMaxTicketsRegistred: null,
  lotteryName: null,
  registratedId: null,
};

export const raffleRegistrationSlice = createSlice({
  name: 'raffleRegistration',
  initialState: RaffleRegistrationInitialState,
  reducers: {
    setLotteryName: (state, { payload }: PayloadAction<TRaffleRegistrationState['lotteryName']>) => {
      state.lotteryName = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(getPoliciesForRaffle.matchFulfilled, (state, { payload }) => ({
      ...state,
      ...payload,
    }));

    builder.addMatcher(registerUserInRaffle.matchFulfilled, (state, { payload }) => ({
      ...state,
      ...{
        registratedId: payload.id ?? null,
      },
    }));
  },
});

export const { setLotteryName } = raffleRegistrationSlice.actions;
