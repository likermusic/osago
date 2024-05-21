import type { Order } from 'commonTypes/api/orderInfo';

import { mapPolicyLink } from '../mapPolicyLink';

describe('WHEN "mapPolicyLink" is called', () => {
  it.each([
    undefined,
    null,
    {},
    [],
    {
      policyLink: undefined,
      policyNumber: null,
      archiveLink: undefined,
    },
  ])('AND data was not correct as %p, MUST return object with empty fields', (propositions) => {
    expect(mapPolicyLink(propositions as Order.PostPolicyLink)).toEqual({
      policyLink: null,
      policyNumber: '',
      archiveLink: null,
    });
  });

  it('AND data was fully provided, MUST map correctly', () => {
    expect(
      mapPolicyLink({
        policyLink: '123',
        policyNumber: '123',
        archiveLink: '123',
      }),
    ).toEqual({
      policyLink: '123',
      policyNumber: '123',
      archiveLink: '123',
    });
  });
});
