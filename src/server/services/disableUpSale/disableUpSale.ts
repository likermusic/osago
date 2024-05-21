import type { disableUpSale } from 'commonTypes/api/disableUpSale';

import { config } from '../../constants/config';
import { requestWithTokenGet } from '../../utils/api/api';

export const disableUpSaleRequest = async (orderHash: string) => {
  const { data: isSpoiled } = await requestWithTokenGet<disableUpSale.GetDisableUpSale>(
    `${config.OSAGOGATEWAY}/v1/orders/${encodeURI(orderHash)}/spoil`,
    config.OSAGOGATEWAY_SERVICE_SCOPE,
  );

  return isSpoiled;
};
