import type { PropositionCalculations } from 'commonTypes/api/propositionCalculations';
import { ORDER, ORDER_INITIAL, ORDER_TRANSFORMED } from 'mocks/mappersPropositionCalculations';

import { mapOrderCalculationsResponse } from '../mapOrderCalculationsResponse';

describe('WHEN "mapOrderCalculationsResultsResponse" is called', () => {
  it.each([undefined, null, [[null]], [[undefined]], [['']], [[{}]]])(
    'AND data was not correct as %p, MUST return initial array',
    (order) => {
      expect(mapOrderCalculationsResponse(order as unknown as PropositionCalculations.GetManyOrders)).toEqual(
        ORDER_INITIAL,
      );
    },
  );

  it('AND data was fully provided, MUST map correctly', () => {
    expect(mapOrderCalculationsResponse(ORDER)).toEqual(ORDER_TRANSFORMED);
  });
});
