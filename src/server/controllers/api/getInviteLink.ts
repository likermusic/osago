import { getInviteLinkRequest } from '../../services/getInviteLink';
import { getOrderInfoRequest } from '../../services/orderInfo';

export const getInviteLink = async (ctx: App.ExtendedContext) => {
  const { orderHash } = ctx.query;
  let userId = ctx.user?.sub;

  if (!userId) userId = (await getOrderInfoRequest(orderHash, true))?.userId;

  ctx.body = await getInviteLinkRequest(userId);
};
