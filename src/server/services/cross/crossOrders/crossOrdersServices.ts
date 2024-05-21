import type { Cross } from 'commonTypes/api/cross';

import { config } from '../../../constants/config';
import { requestWithoutTokenGet, requestWithoutTokenPost } from '../../../utils/api/api';

export const getCrossOrders = async (hash: string) => {
  if (!hash) {
    return null;
  }

  const { data } = await requestWithoutTokenGet<Cross.GetCrossOrders>(
    `${config.OSAGOGATEWAY}/v1/x/order/${encodeURI(hash)}`,
  );

  return data;
};

export const postCrossOrders = async (body: Cross.PostCrossOrdersRequest) => {
  if (!body.propositionHash) {
    return null;
  }

  const { data } = await requestWithoutTokenPost<Cross.PostCrossOrders>(`${config.OSAGOGATEWAY}/v1/x/order`, body);

  return data;
};
