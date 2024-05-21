import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { StateInvitation } from '../types';

const initialState: StateInvitation = {
  name: '',
};

export const invitationSlice = createSlice({
  name: 'invitation',
  initialState,
  reducers: {
    setInvitation: (state, { payload }: PayloadAction<string>) => {
      state.name = payload;
    },
    destroyInvitation: () => initialState,
  },
});
