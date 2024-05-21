import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { TAppConfig, IAppConfigState, TAnalytics } from '../types';

const initialState: IAppConfigState = {
  config: {
    appType: 'sravni.ru',
    gtmKey: '',
    isNewProlongation: false,
    isPaidTraffic: false,
    openPaymentLinkInCurrentTab: false,
    originalUrl: '',
    isMobileAppRaffle: false,
  },
  analytics: {
    base: null,
  },
};

export const appConfigSlice = createSlice({
  name: 'appConfig',
  initialState,
  reducers: {
    setAnalyticsBase: (state, { payload }: PayloadAction<TAnalytics['base']>) => {
      state.analytics.base = payload;
    },
    setABStatistics: (state, { payload }: PayloadAction<TAnalytics['analyticsABTestStatistics']>) => {
      state.analytics.analyticsABTestStatistics = payload;
    },
    setAppConfig: (state, { payload }: PayloadAction<TAppConfig>) => {
      state.config = payload;
    },
  },
});

export const { setAnalyticsBase, setABStatistics, setAppConfig } = appConfigSlice.actions;
