import type { Order } from 'commonTypes/api/orderInfo';

import { NO_COMPANY_INFO_OFFER_ERROR } from 'shared/lib/validations/Errors.texts';

import type { PolicyInfoResult } from '../../types';
import { mapPurchasedPolicy } from '../mapPurchasedPolicy';

const ORDER_INFO: Order.GetOrderInfo = {
  company: {
    id: 123,
    name: '123333',
    logoUrl: '/href',
    ratingInfo: {
      clientRating: 1,
      expertRating: 2,
      clientRatingDetalization: {
        star1Count: 3,
        star2Count: 4,
        star3Count: 5,
        star4Count: 5,
        star5Count: 1,
      },
      paymentRating: '2',
      paymentRatingDescription: '123',
      positiveTag: {
        name: '22',
        description: '222',
        ratingValue: '2',
      },
      negativeTag: {
        name: '22',
        description: '222',
        ratingValue: '2',
      },
      ratings: [
        {
          name: '22',
          description: '22',
          value: '22',
          ratingDescription: '22',
        },
      ],
      comment: '22',
    },
    yearsOnMarket: 10,
    branchCount: 3,
    yearsWithSravni: 4,
    soldPolicyCount: '2222',
    soldYesterdayPolicyCount: '22',
    foundationYear: 10000,
    marketShare: 222,
  },
  contractNumber: '330230203',
  email: 'a@a.ru',
  name: '23232',
  price: 222,
  policyBlankLink: '/href',
  policyDocumentsLink: 'href',
  userId: 1233,
  cashBackSuccess: [
    {
      title: '222',
      subtitle: 'wddw',
      color: 'Green',
    },
  ],
};

const ORDER_INFO_RESULT: PolicyInfoResult = {
  company: {
    id: 123,
    name: '123333',
    logoUrl: '/href',
    ratingInfo: {
      clientRating: 1,
      expertRating: 2,
      clientRatingDetalization: {
        star1Count: 3,
        star2Count: 4,
        star3Count: 5,
        star4Count: 5,
        star5Count: 1,
      },
      paymentRating: '2',
      paymentRatingDescription: '123',
      positiveTag: {
        name: '22',
        description: '222',
        ratingValue: '2',
      },
      negativeTag: {
        name: '22',
        description: '222',
        ratingValue: '2',
      },
      ratings: [
        {
          name: '22',
          description: '22',
          value: '22',
          ratingDescription: '22',
        },
      ],
      comment: '22',
    },
    yearsOnMarket: 10,
    branchCount: 3,
    yearsWithSravni: 4,
    soldPolicyCount: '2222',
    soldYesterdayPolicyCount: '22',
    foundationYear: 10000,
    marketShare: 222,
  },
  contractNumber: '330230203',
  email: 'a@a.ru',
  name: '23232',
  price: 222,
  policyBlankLink: '/href',
  policyDocumentsLink: 'href',
  userId: 1233,
  cashBackSuccess: [
    {
      action: null,
      color: undefined,
      modalTitle: undefined,
      subtitle: '',
      title: '222',
      url: undefined,
    },
  ],
};

describe('WHEN "mapPurchasedPolicy" is called', () => {
  it.each([undefined, null, {}, []])(
    'AND data was not correct as %p, MUST return object with empty fields',
    (propositions) => {
      expect(() => mapPurchasedPolicy(propositions as Order.GetOrderInfo)).toThrowError(NO_COMPANY_INFO_OFFER_ERROR);
    },
  );

  it('AND data was fully provided, MUST map correctly', () => {
    expect(mapPurchasedPolicy(ORDER_INFO)).toEqual(ORDER_INFO_RESULT);
  });
});
