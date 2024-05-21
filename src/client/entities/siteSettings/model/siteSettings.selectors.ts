import type { SliceStateFromReducer } from 'shared/types';

import type { siteSettingsSlice } from './siteSettings.slice';

type TSiteSettingsSlice = SliceStateFromReducer<typeof siteSettingsSlice>;
export const selectSiteSettingsFooter = (state: TSiteSettingsSlice) => state.siteSettings.footer;
export const selectSiteSettingsHeader = (state: TSiteSettingsSlice) => state.siteSettings.header;
