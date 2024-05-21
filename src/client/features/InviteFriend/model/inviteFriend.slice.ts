import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { sendEventLoadInviteFriendLink } from 'shared/lib/sendGAEvents';
import { DisplayLinkStatusesType } from 'shared/lib/sendGAEvents/events';

import type { IInviteFriend } from '../types';

import { queries } from './inviteFriend.query';

const initialState: IInviteFriend = {
  inviteLink: null,
  isInviteLinkLoading: true,
};

export const inviteFriendSlice = createSlice({
  name: 'inviteFriend',
  initialState,
  extraReducers: (builder) => {
    builder.addMatcher(queries.endpoints.getInviteLink.matchFulfilled, (_, { payload }: PayloadAction<string>) => {
      sendEventLoadInviteFriendLink(DisplayLinkStatusesType.Success);
      return {
        isInviteLinkLoading: false,
        inviteLink: payload,
      };
    });
    builder.addMatcher(queries.endpoints.getInviteLink.matchRejected, (state) => {
      sendEventLoadInviteFriendLink(DisplayLinkStatusesType.Failure);
      return {
        ...state,
        isInviteLinkLoading: false,
      };
    });
  },
  reducers: {},
});
