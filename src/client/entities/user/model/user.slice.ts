import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { StateUser } from '../types';

import { queries } from './user.query';

const initialState: StateUser = {
  account: undefined,
  isLoggedIn: false,
  restoredAccount: null,
  esiaErrorCount: 0,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, { payload }: PayloadAction<StateUser['account']>) => {
      state.isLoggedIn = true;
      state.restoredAccount = null;
      state.account = payload;
      state.esiaErrorCount = 0;
    },
    addEsiaErrorAttempt: (state) => {
      state.esiaErrorCount += 1;
    },
    setEsiaStep: (state, { payload }: PayloadAction<string>) => {
      state.esiaStep = payload;
    },
    saveRestoredUserId: (state, { payload }: PayloadAction<StateUser['restoredAccount']>) => {
      state.restoredAccount = payload;
    },
    destroyUser: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      queries.endpoints.getUserInfo.matchFulfilled,
      (state, { payload }: PayloadAction<StateUser['account']>) => ({
        ...state,
        account: payload,
      }),
    );
  },
});

export const { addEsiaErrorAttempt, setEsiaStep, saveRestoredUserId, setUser } = userSlice.actions;
