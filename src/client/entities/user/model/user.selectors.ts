import type { SliceStateFromReducer } from 'shared/types';

import type { userSlice } from './user.slice';

type TUserState = SliceStateFromReducer<typeof userSlice>;

export const accountSelector = (state: TUserState) => (state.user.isLoggedIn ? state.user.account : null);
export const accountPhoneSelector = (state: TUserState) =>
  state.user.isLoggedIn ? state.user.account?.phone_number : null;

export const isUserLoggedInSelector = (state: TUserState) => state.user.isLoggedIn;
export const userHasEsiaSelector = (state: TUserState) => !!state.user.account?.isHasEsia;
export const userEsiaStartStepSelector = (state: TUserState) => state.user.esiaStep;
export const userEsiaIsErrorSelector = (state: TUserState) => state.user.esiaErrorCount > 2;
export const userIdSelector = (state: TUserState) => state.user.account?.sub;
export const userIdOrRestoredIdSelector = (state: TUserState) =>
  state.user.account?.sub || state.user?.restoredAccount?.sub;
export const restoredAccountSelector = (state: TUserState) => state.user?.restoredAccount;
