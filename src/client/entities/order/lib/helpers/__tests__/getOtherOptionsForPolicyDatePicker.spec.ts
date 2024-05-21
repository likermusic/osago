import { PROPOSITIONS_CORRECT_DATA_TRANSFORMED } from 'mocks/propositionsData';

import { DATE_VALUE_ALL } from 'entities/order';

import type { TForwardingPropositionsMappedByDate } from '../../../types';
import { getOtherOptionsForPolicyDatePicker } from '../getOtherOptionsForPolicyDatePicker';

const PROPOSITIONS = {
  [DATE_VALUE_ALL]: PROPOSITIONS_CORRECT_DATA_TRANSFORMED,
  '2021-01-01': PROPOSITIONS_CORRECT_DATA_TRANSFORMED,
  '2021-02-01': [...PROPOSITIONS_CORRECT_DATA_TRANSFORMED, ...PROPOSITIONS_CORRECT_DATA_TRANSFORMED],
};

const PROPOSITIONS_CONVERTED = [
  { badgeText: '3', label: 'с 2021-01-01', value: '2021-01-01' },
  { badgeText: '6', label: 'с 2021-02-01', value: '2021-02-01' },
];

const DATES = ['2021-01-01', '2021-02-01'];

describe('WHEN "getOtherOptionsForPolicyDatePicker" is called', () => {
  it.each([null, undefined, []])('MUST return empty array if propositions %p', (prop) => {
    expect(getOtherOptionsForPolicyDatePicker([], prop as unknown as TForwardingPropositionsMappedByDate)).toEqual([]);
  });

  it('MUST return correct options', () => {
    expect(getOtherOptionsForPolicyDatePicker(DATES, PROPOSITIONS)).toEqual(PROPOSITIONS_CONVERTED);
  });
});
