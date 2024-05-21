import type { Order } from 'commonTypes/api/orderInfo';

import { getMobileLogoLinkFromCompanyId } from '../../../../commonUtils/getLogoLinkFromCompanyId';
import { config } from '../../../constants/config';
import { requestWithoutTokenGet, requestWithoutTokenPost } from '../../../utils/api/api';

export const getOrderInfoRequest = async (orderHash: string, force: boolean) => {
  if (!orderHash) {
    return null;
  }

  const { data } = await requestWithoutTokenGet<Order.GetOrderInfo>(
    `${config.OSAGOGATEWAY}/v1/many-orders/${encodeURI(orderHash)}/info?force=${force}`,
  );

  if (data?.company?.id && !data.company.logoUrl) {
    data.company.logoUrl = getMobileLogoLinkFromCompanyId(data.company.id);
  }

  return data;
};

export const postPolicyLinkRequest = async (orderHash: string) => {
  if (!orderHash) {
    return null;
  }

  const { data } = await requestWithoutTokenPost<Order.PostPolicyLink>(
    `${config.OSAGO_STAFF}/v1/order/${orderHash}/policyinfo`,
  );

  return data;
};
