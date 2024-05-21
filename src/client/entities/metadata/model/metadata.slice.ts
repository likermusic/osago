import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { Metadata, StateMetadata } from '../types';

const initialState: StateMetadata = {};

export const metadataSlice = createSlice({
  name: 'metadata',
  initialState,
  reducers: {
    setMetadata: (_, { payload }: PayloadAction<Metadata>) => payload,
  },
});
