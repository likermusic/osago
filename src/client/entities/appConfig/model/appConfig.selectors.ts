import type { SliceStateFromReducer } from 'shared/types';

import { tryEnrichPlatformWithAbTestValue } from '../lib';

import type { appConfigSlice } from './appConfig.slice';

type TAppConfigStore = SliceStateFromReducer<typeof appConfigSlice>;

export const analyticsBaseSelector = (state: TAppConfigStore) => state.appConfig.analytics.base;
export const analyticsUTMSelector = (state: TAppConfigStore) => state.appConfig.analytics?.base?.utm;
export const originalUrlSelector = (state: TAppConfigStore) => state.appConfig.config.originalUrl;
export const isMobileAppRaffleSelector = (state: TAppConfigStore) => state.appConfig.config.isMobileAppRaffle;

export const analyticsABTestStatisticsSelector = (state: TAppConfigStore) =>
  state.appConfig?.analytics?.analyticsABTestStatistics?.statistics;

export const analyticsGTMSelector = (state: TAppConfigStore) => state.appConfig?.config?.gtmKey;

export const platformSelector = (state: TAppConfigStore) => {
  const { appType } = state.appConfig.config;
  const abData = state.appConfig.analytics.analyticsABTestStatistics;

  return tryEnrichPlatformWithAbTestValue(appType, abData);
};
