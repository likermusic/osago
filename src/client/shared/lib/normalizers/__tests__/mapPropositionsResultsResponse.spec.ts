import type { PropositionCalculations } from 'commonTypes/api/propositionCalculations';
import { PROPOSITIONS_CORRECT_DATA, PROPOSITIONS_CORRECT_DATA_TRANSFORMED } from 'mocks/propositionsData';

import { mapPropositionsResultsResponse } from '../mapPropositionsResultsResponse';

describe('WHEN "mapPropositionsResultsResponse" is called', () => {
  it.each([undefined, null, [[null]], [[undefined]], [['']], [[{}]]])(
    'AND data was not correct as %p, MUST return empty array',
    (order) => {
      expect(
        mapPropositionsResultsResponse(order as unknown as PropositionCalculations.GetCalculations['offers']),
      ).toEqual([]);
    },
  );

  it('AND data was fully provided, MUST map correctly', () => {
    expect(mapPropositionsResultsResponse(PROPOSITIONS_CORRECT_DATA)).toEqual(PROPOSITIONS_CORRECT_DATA_TRANSFORMED);
  });

  it('AND one proposition without price, MUST not include this proposition', () => {
    const propositionsFirstPropositionWithWrongPrice = PROPOSITIONS_CORRECT_DATA.map((proposition, i) => ({
      ...proposition,
      price: i === 0 ? undefined : proposition.price,
    }));

    const transformedProporitions = PROPOSITIONS_CORRECT_DATA_TRANSFORMED.slice(
      1,
      PROPOSITIONS_CORRECT_DATA_TRANSFORMED.length,
    );

    expect(mapPropositionsResultsResponse(propositionsFirstPropositionWithWrongPrice)).toEqual(transformedProporitions);
  });
});
