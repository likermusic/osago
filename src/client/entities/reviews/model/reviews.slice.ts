import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { StateReviews } from '../types';

const initialState: StateReviews = [];

export const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    setReviews: (_, { payload }: PayloadAction<StateReviews>) => payload,
  },
});
