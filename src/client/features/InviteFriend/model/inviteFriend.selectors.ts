import type { SliceStateFromReducer } from 'shared/types';

import type { inviteFriendSlice } from './inviteFriend.slice';

export type TInviteFriendState = SliceStateFromReducer<typeof inviteFriendSlice>;

export const inviteLinkSelector = (state: TInviteFriendState) => state.inviteFriend.inviteLink;

export const isInviteLinkLoadingSelector = (state: TInviteFriendState) => state.inviteFriend.isInviteLinkLoading;
