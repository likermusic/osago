import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { TWhiteLabelState } from '../types';

const initialState: TWhiteLabelState = {
  nonPartnerWl: false,
  wl: {},
};

export const whiteLabelSlice = createSlice({
  name: 'whiteLabel',
  initialState,
  reducers: {
    setWhiteLabel: (_, { payload }: PayloadAction<TWhiteLabelState>) => payload,
  },
});
