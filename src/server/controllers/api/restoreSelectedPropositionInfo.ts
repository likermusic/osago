import { restoreSelectedPropositionInfoRequest } from '../../services/restoreSelectedPropositionInfo/restoreSelectedPropositionInfo';

export const restoreSelectedPropositionInfo = async (ctx: App.ExtendedContext) => {
  const { orderHash } = ctx.query;

  ctx.body = await restoreSelectedPropositionInfoRequest(orderHash);
};
