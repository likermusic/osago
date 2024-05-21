import { PROPOSITIONS_CORRECT_DATA, PROPOSITIONS_CORRECT_DATA_TRANSFORMED } from 'mocks/propositionsData';

import type { TNonNullableCalculationPropositionCompany } from 'shared/types';

import { mapAdvantages } from '../mapAdvantages';

const COMPANY = PROPOSITIONS_CORRECT_DATA[0].company;
const ADVANTAGE_TRANSFORMED = PROPOSITIONS_CORRECT_DATA_TRANSFORMED[0].advantages;

describe('WHEN "mapAdvantages" is called', () => {
  it.each([undefined, null, {}, []])('AND data was not correct as %p, MUST return empty array', (ADVANTAGE) => {
    expect(mapAdvantages(ADVANTAGE as unknown as TNonNullableCalculationPropositionCompany)).toEqual([]);
  });

  it('AND data was fully provided, MUST map correctly', () => {
    expect(mapAdvantages(COMPANY as unknown as TNonNullableCalculationPropositionCompany)).toEqual(
      ADVANTAGE_TRANSFORMED,
    );
  });
});
