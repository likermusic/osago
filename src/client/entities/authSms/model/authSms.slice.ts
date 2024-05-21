import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { AuthSmsState, AuthPhoneInfo } from '../types';

const initialState: AuthSmsState = {
  authSmsIsSending: false,
  authSmsIsValid: false,
  showSmsCode: false,
  shouldShowUserAgreement: false,
  error: null,
  phonesInfo: {},
};

export const authSmsSlice = createSlice({
  name: 'authSms',
  initialState,
  reducers: {
    setAuthSmsValidationStatus: (state, { payload }: PayloadAction<AuthSmsState['authSmsIsValid']>) => {
      state.authSmsIsValid = payload;
    },
    setAuthError: (state, { payload }: PayloadAction<AuthSmsState['error']>) => {
      state.error = payload;
      state.authSmsIsSending = false;
    },
    resetAuthError: (state) => {
      state.error = null;
    },
    validateSmsCode: (state) => ({
      ...state,
      authSmsIsSending: true,
      otac: undefined,
      username: undefined,
      userId: undefined,
    }),
    setShowSmsCode: (state, { payload }: PayloadAction<AuthSmsState['showSmsCode']>) => {
      state.showSmsCode = payload;
      if (payload) {
        state.otac = undefined;
      }
    },
    signInFinish: (state) => {
      state.authSmsIsSending = false;
    },
    signInStarted: (state) => {
      state.authSmsIsSending = true;
    },
    setShouldShowUserAgreement: (state, { payload }: PayloadAction<boolean>) => {
      state.shouldShowUserAgreement = payload;
    },
    setSignInCredentials: (state, { payload }: PayloadAction<{ otac: string; username: string; userId: string }>) => {
      state.otac = payload.otac;
      state.username = payload.username;
      state.userId = payload.userId;
    },
    updatePhonesInfo: (
      state,
      { payload }: PayloadAction<{ phoneInfo: Partial<AuthPhoneInfo>; phoneNumber: string }>,
    ) => ({
      ...state,
      phonesInfo: {
        ...state.phonesInfo,
        [payload.phoneNumber]: {
          ...state.phonesInfo[payload.phoneNumber],
          ...payload.phoneInfo,
        },
      },
    }),
  },
});

export const {
  setAuthSmsValidationStatus,
  setAuthError,
  resetAuthError,
  validateSmsCode,
  setShowSmsCode,
  signInFinish,
  signInStarted,
  setSignInCredentials,
  updatePhonesInfo,
  setShouldShowUserAgreement,
} = authSmsSlice.actions;
