import type { OSAGOGATEWAY_API } from '../../generatedDTO';

declare namespace InviteFriend {
  export type GetInviteLinkResponse =
    OSAGOGATEWAY_API['/v1/loyalty/invite']['post']['responses']['200']['content']['application/json'];
}
