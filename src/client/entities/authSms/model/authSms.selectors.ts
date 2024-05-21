import { createSelector } from 'reselect';

import type { SliceStateFromReducer } from 'shared/types';

import type { authSmsSlice } from './authSms.slice';

type TAuthStore = SliceStateFromReducer<typeof authSmsSlice>;

const authSmsSelector = (state: TAuthStore) => state.authSms;

export const authSmsIsSendingSelector = (state: TAuthStore) => authSmsSelector(state).authSmsIsSending;

export const authSmsIsValidSelector = (state: TAuthStore) => authSmsSelector(state).authSmsIsValid;

export const authSmsIsSuccessfulSelector = (state: TAuthStore) =>
  authSmsSelector(state).authSmsIsSending || authSmsSelector(state).authSmsIsValid;

export const shouldShowSmsCodeSelector = (state: TAuthStore) => authSmsSelector(state).showSmsCode;
export const shouldShowUserAgreementSelector = (state: TAuthStore) => authSmsSelector(state).shouldShowUserAgreement;
export const selectAuthErrorSelector = (state: TAuthStore) => authSmsSelector(state).error;
export const selectAuthCredentials = createSelector(authSmsSelector, (authSms) => ({
  otac: authSms.otac,
  username: authSms.username,
  userId: authSms.userId,
  shouldShowSmsCode: authSms.showSmsCode,
}));
export const selectPhonesInfo = (state: TAuthStore) => authSmsSelector(state).phonesInfo;
export const selectUserId = (state: TAuthStore) => authSmsSelector(state).userId;

export const selectRequestCodeAttemtsByNumberSelector = createSelector(
  selectPhonesInfo,
  (phonesInfo) => (mobileNumber: string) => phonesInfo?.[mobileNumber]?.requestCodeAttemts,
);
