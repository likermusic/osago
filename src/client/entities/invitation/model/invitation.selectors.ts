import type { SliceStateFromReducer } from 'shared/types';

import type { invitationSlice } from './invitation.slice';

type TInvitationState = SliceStateFromReducer<typeof invitationSlice>;

export const invitationSelectors = {
  invitationSelector: (state: TInvitationState) => state.invitation.name,
};
