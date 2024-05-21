import { PROPOSITIONS_CORRECT_DATA, PROPOSITIONS_CORRECT_DATA_TRANSFORMED } from 'mocks/propositionsData';

import type { TNonNullableCalculationPropositionCompany } from 'shared/types';

import { mapDescription } from '../mapDescription';

const COMPANY = PROPOSITIONS_CORRECT_DATA[0].company;
const PRICE = PROPOSITIONS_CORRECT_DATA[0].price;
const DESCRIPTION_TRANSFORMED = PROPOSITIONS_CORRECT_DATA_TRANSFORMED[0].description;

describe('WHEN "mapDescription" is called', () => {
  it.each([undefined, null, {}])('AND data was not correct as %p, MUST return initial object', (description) => {
    expect(mapDescription(description as unknown as TNonNullableCalculationPropositionCompany, 0)).toEqual(null);
  });

  it('AND data was fully provided, MUST map correctly', () => {
    expect(
      mapDescription(COMPANY as unknown as TNonNullableCalculationPropositionCompany, PRICE as unknown as number),
    ).toEqual(DESCRIPTION_TRANSFORMED);
  });
});
