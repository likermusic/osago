import type { PropositionCalculations } from '../../../types/api/propositionCalculations';
import {
  getCalculationsHashRequest,
  getManyOrdersRequest,
  getPropositionCalculationsRequest,
  postManyOrdersRequest,
} from '../../services/propositionCalculations';
import { verifyOrderHash, verifyQueryHash } from '../../services/verifiers';

export const getPropositionCalculations = async (ctx: App.ExtendedContext) => {
  const { calcHash } = ctx.query;

  ctx.body = await getPropositionCalculationsRequest(calcHash);
};

export const getCalculationsHash = async (ctx: App.ExtendedContext) => {
  const { hash, searchId, query, orderHash } = ctx.request.body as PropositionCalculations.GetCalculationsHashRequest;

  if (hash && searchId) {
    await verifyQueryHash(searchId, hash);
  } else if (orderHash) {
    await verifyOrderHash(orderHash);
  }

  ctx.body = await getCalculationsHashRequest(query);
};
export const getManyOrders = async (ctx: App.ExtendedContext) => {
  const { orderHash } = ctx.query;

  ctx.body = await getManyOrdersRequest(orderHash);
};
export const postManyOrders = async (ctx: App.ExtendedContext) => {
  const query = ctx.request.body;

  ctx.body = await postManyOrdersRequest(query);
};
