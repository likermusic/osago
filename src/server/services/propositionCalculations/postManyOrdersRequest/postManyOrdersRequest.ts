import type { PropositionCalculations } from 'commonTypes/api/propositionCalculations';

import { config } from '../../../constants/config';
import { requestWithTokenPost } from '../../../utils/api/api';

export const postManyOrdersRequest = async (query: PropositionCalculations.PostManyOrdersRequest) => {
  const { data } = await requestWithTokenPost<
    PropositionCalculations.PostManyOrders,
    PropositionCalculations.PostManyOrdersRequest
  >(`${config.OSAGOGATEWAY}/v1/many-orders`, '', query);

  return { hash: data.hash, draftFullUrl: data?.draftFullUrl };
};
