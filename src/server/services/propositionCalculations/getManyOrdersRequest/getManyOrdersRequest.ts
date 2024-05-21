import type { PropositionCalculations } from 'commonTypes/api/propositionCalculations';

import { config } from '../../../constants/config';
import { requestWithoutTokenGet } from '../../../utils/api/api';

export const getManyOrdersRequest = async (orderHash: string) => {
  if (!orderHash) {
    return null;
  }

  const { data } = await requestWithoutTokenGet<PropositionCalculations.GetManyOrders>(
    `${config.OSAGOGATEWAY}/v1/many-orders/${orderHash}/?withoutSomeAlerts=true`,
  );

  return data;
};
