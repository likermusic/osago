import type { PropositionCalculations } from 'commonTypes/api/propositionCalculations';

import { mapDriversWithKbm } from '../mapKbmDrivers';

describe('WHEN "mapDriversWithKbm" is called', () => {
  it.each([undefined, null, [[null]], [[undefined]], [['']], [[{}]], {}, [], { drivers: {} }])(
    'AND data was not correct as %p, MUST return initial array',
    (drivers) => {
      expect(mapDriversWithKbm(drivers as unknown as PropositionCalculations.GetCalculations['kbmInfo'])).toEqual([]);
    },
  );

  it('AND data was fully provided, MUST map correctly', () => {
    expect(mapDriversWithKbm({ drivers: [{ lastName: 'a', middleName: 'a', firstName: 'a', kbm: 1 }] })).toEqual([
      { fullName: 'a a a', kbm: 1 },
    ]);
  });

  it('AND data was not fully provided, MUST return with nullable data', () => {
    expect(mapDriversWithKbm({ drivers: [{}] })).toEqual([{ fullName: '', kbm: null }]);
  });
});
