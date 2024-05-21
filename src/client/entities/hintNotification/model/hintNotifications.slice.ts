import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { IHintNotification } from '../types';

const initialState: IHintNotification = {
  type: 'info',
  message: '',
  title: '',
  position: 0,
};

export const hintNotificationSlice = createSlice({
  name: 'hintNotification',
  initialState,
  reducers: {
    clearNotification: (state) => ({ ...state, ...initialState }),

    setNotification: (state, { payload }: PayloadAction<IHintNotification>) => ({ ...state, ...payload }),
  },
});

export const { clearNotification, setNotification } = hintNotificationSlice.actions;
