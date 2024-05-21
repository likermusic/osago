import type { Order } from 'commonTypes/api/orderInfo';

import { config } from '../../../constants/config';
import { requestWithoutTokenGet } from '../../../utils/api/api';

export const requestOrderInfoQuery = async (orderHash?: string | string[]): Promise<Nullable<Order.OrderQuery>> => {
  if (typeof orderHash !== 'string') {
    return null;
  }

  try {
    const { data } = await requestWithoutTokenGet<Order.OrderQuery>(
      `${config.OSAGO_STAFF}/v1.0/order/${orderHash}/queries`,
      {
        params: {
          ignoreLastDnd: 'true',
        },
      },
    );

    return data;
  } catch (e) {
    return null;
  }
};
