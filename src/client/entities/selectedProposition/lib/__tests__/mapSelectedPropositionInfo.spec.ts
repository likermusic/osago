import type { RestoreSelectedProposition } from 'commonTypes/api/restoreSelectedProposition';

import { mapSelectedPropositionInfo } from '../mapSelectedPropositionInfo';

const DATA = {
  price: 1000,
  companyId: 1234,
};

const DATA_ZERO_PRICE = {
  price: 0,
  companyId: 1234,
};

describe('WHEN "mapSelectedPropositionInfo" is called', () => {
  it.each([undefined, null, {}, [], { policyUrl: null }])(
    'AND data was not correct as %p, MUST return null',
    (response) => {
      expect(mapSelectedPropositionInfo(response as RestoreSelectedProposition.Response)).toEqual(null);
    },
  );

  it('AND data was fully provided, MUST map correctly', () => {
    expect(mapSelectedPropositionInfo(DATA as RestoreSelectedProposition.Response)).toEqual({
      price: DATA.price,
      activeCompanyId: DATA.companyId,
    });
  });
  it('AND data was with zero price, MUST map correctly', () => {
    expect(mapSelectedPropositionInfo(DATA_ZERO_PRICE as RestoreSelectedProposition.Response)).toEqual({
      price: DATA_ZERO_PRICE.price,
      activeCompanyId: DATA.companyId,
    });
  });
});
