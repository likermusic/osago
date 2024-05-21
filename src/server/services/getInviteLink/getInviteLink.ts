import type { InviteFriend } from 'commonTypes/api/inviteFriend';

import { config } from '../../constants/config';
import { requestWithoutTokenPost } from '../../utils/api/api';

export const getInviteLinkRequest = async (userId: string) => {
  const { data } = await requestWithoutTokenPost<InviteFriend.GetInviteLinkResponse>(
    `${config.OSAGOGATEWAY}/v1/loyalty/invite`,
    null,
    { params: { userId } },
  );

  return data;
};
