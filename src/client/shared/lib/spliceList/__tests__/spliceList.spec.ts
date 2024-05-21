import { generateCalculationPropositionMock } from 'mocks/propositionsData';

import { spliceList } from '../spliceList';

describe('WHEN "spliceList" is called', () => {
  it('AND propositions were not provided, MUST return default values', () => {
    // @ts-ignore
    expect(spliceList(undefined, 1, 2)).toEqual([]);
  });

  describe('AND propositions were provided', () => {
    const company1 = generateCalculationPropositionMock();
    const company2 = generateCalculationPropositionMock();
    const company3 = generateCalculationPropositionMock();

    it('MUST return cut part and new list in object', () => {
      const propositions = [company1, company2, company3];
      expect(spliceList(propositions, 1, 1)).toEqual([company2]);
    });

    it('MUST mutate old object', () => {
      const propositions = [company1, company2, company3];
      spliceList(propositions, 1, 1);

      expect(propositions).toEqual([company1, company3]);
    });
  });
});
