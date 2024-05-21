import { nanoid } from 'nanoid';

import type { IOrderProposition } from 'shared/types';

export const generateEmptyOrder = (options: Partial<IOrderProposition> = {}): IOrderProposition => {
  const id = nanoid();

  return {
    id,

    absoluteTags: [],
    advantages: [],
    alerts: [],
    startDate: null,

    company: null,
    description: null,
    draftFullUrl: null,
    isPriceChanged: false,
    orderHash: null,
    calcHash: null,
    paymentUrl: null,
    price: null,
    productId: null,
    searchPrice: null,
    tags: [],

    orderPropositionStatus: 'loading',

    isProlongation: undefined,
    isSectionSponsor: undefined,

    ...options,
  };
};
