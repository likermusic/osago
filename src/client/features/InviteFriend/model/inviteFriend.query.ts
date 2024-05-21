import type { InviteFriend } from 'commonTypes/api/inviteFriend';
import { BFF_API_ROUTES } from 'constants/apiRoutes';

import { baseRTKApi } from 'shared/api/baseApi';

export const queries = baseRTKApi.injectEndpoints({
  endpoints: (build) => ({
    getInviteLink: build.query<InviteFriend.GetInviteLinkResponse, string | string[] | undefined>({
      query: (orderHash) => ({
        url: BFF_API_ROUTES.getInviteLink,
        method: 'POST',
        responseHandler: 'text',
        params: { orderHash },
      }),
    }),
  }),
});

export const useGetInviteLink = queries.useGetInviteLinkQuery;
