import type { PoliciesDrafts } from 'commonTypes/api/policiesDrafts';

import { getPoliciesDraftsRequest } from '../../services/getPoliciesDraftsRequest/getPoliciesDraftsRequest';

export const getPoliciesDrafts = async (ctx: App.ExtendedContext) => {
  const { query, companyId } = ctx.request.body as PoliciesDrafts.BFFRequest;

  ctx.body = await getPoliciesDraftsRequest(query, companyId);
};
