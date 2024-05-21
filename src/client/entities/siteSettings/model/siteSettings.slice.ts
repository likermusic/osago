import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { ISiteSettings } from '@sravni/types/lib/sitesettings';

import type { StateSiteSettings } from '../types';

const initialState: StateSiteSettings = {
  footer: undefined,
  header: undefined,
};

export const siteSettingsSlice = createSlice({
  name: 'siteSettings',
  initialState,
  reducers: {
    setSettings: (_, action: PayloadAction<ISiteSettings>) => action.payload,
  },
});
