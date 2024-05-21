import { WL_QUERY_PARAMS } from '../../../constants';
import { requestOrderInfoQuery } from '../../services/orderInfo/requestOrderInfoQuery/requestOrderInfoQuery';
import { isWL } from '../setWl/isWl';

export const getParentId = async (ctx: App.ExtendedContext): Promise<number | undefined> => {
  const query = ctx.query || {};

  let parentId = query[WL_QUERY_PARAMS.partnerId];
  if (!parentId && query.orderHash && isWL(ctx.req.url)) {
    parentId = await requestOrderInfoQuery(query.orderHash);
  }

  if (typeof parentId === 'string') {
    return parseInt(parentId, 10);
  }

  return parentId;
};
