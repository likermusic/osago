import type { PropositionCalculations } from 'commonTypes/api/propositionCalculations';
import { mockSendSentryClientError } from 'mocks/helpers/sendSentryClientErrorMock';
import { ORDER_INFO_CORRECT_DATA, ORDER_INFO_CORRECT_DATA_TRANSFORMED } from 'mocks/orderInfo';

import { mapOrderInfo } from '../mapOrderInfo';

describe('WHEN "mapOrderInfo" is called', () => {
  it.each([undefined, null])('AND data was not correct as %p, MUST return  empty array', (order) => {
    expect(mapOrderInfo(order as unknown as PropositionCalculations.GetCalculations['orderInfo'])).toEqual(null);
  });

  it('AND data was fully provided, MUST map correctly', () => {
    expect(mapOrderInfo(ORDER_INFO_CORRECT_DATA)).toEqual(ORDER_INFO_CORRECT_DATA_TRANSFORMED);
  });

  it('AND one proposition without price, MUST return this proposition with orderPropositionStatus "error"', () => {
    const propositionsFirstPropositionWithWrongPrice = {
      ...ORDER_INFO_CORRECT_DATA,
      price: undefined,
      searchPrice: undefined,
    };

    const transformedProporitions = {
      ...ORDER_INFO_CORRECT_DATA_TRANSFORMED,
      orderPropositionStatus: 'error',
      price: null,
      searchPrice: null,
      description: null,
    };

    expect(mapOrderInfo(propositionsFirstPropositionWithWrongPrice)).toEqual(transformedProporitions);
    expect(mockSendSentryClientError).toHaveBeenCalledTimes(1);
  });
});
