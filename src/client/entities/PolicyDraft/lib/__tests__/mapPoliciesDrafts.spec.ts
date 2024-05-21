import type { PoliciesDrafts } from 'commonTypes/api/policiesDrafts';

import { mapPoliciesDrafts } from '../mapPoliciesDrafts';

const RESPONSE = {
  result: '123',
  upsalePolicyDraftUrl: '123',
  kidUrl: '123',
};

const RESULT = {
  policyUrl: '123',
  upsaleUrl: '123',
  upsaleRulesUrl: '123',
};

describe('WHEN "mapPoliciesDrafts" is called', () => {
  it.each([undefined, null, {}, [], { policyUrl: null }])(
    'AND data was not correct as %p, MUST throw error',
    (response) => {
      expect(() => mapPoliciesDrafts(response as PoliciesDrafts.Response)).toThrowError();
    },
  );

  it('AND data was fully provided, MUST map correctly', () => {
    expect(mapPoliciesDrafts(RESPONSE as PoliciesDrafts.Response)).toEqual(RESULT);
  });
});
