import { nanoid } from 'nanoid';
import { object, string } from 'yup';

import type { PropositionCalculations } from 'commonTypes/api/propositionCalculations';

import { sendSentryClientErrorOnce } from 'shared/lib/sendSentryClientError';

import type { TGetOrderHash } from '../../types';

export const orderHashSchemaError = object({
  hash: string().length(64).required(),
  draftFullUrl: string().url(),
});

export const mapOrderHashResponse = (data: PropositionCalculations.PostManyOrders): TGetOrderHash => {
  if (!data || !orderHashSchemaError.isValidSync(data)) {
    sendSentryClientErrorOnce(true, '/v1/many-orders вернуло некорректный orderHash', {
      data,
    });

    return {
      orderHash: null,
      orderUniqueHash: null,
    };
  }

  return {
    orderHash: data.hash,
    // orderUniqueHash - уникальных хеш заказа, так как по одинаковой квере бек вернет такой же хеш заказа при повторном запросе
    orderUniqueHash: nanoid(),
  };
};
