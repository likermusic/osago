import type { PropositionCalculations } from 'commonTypes/api/propositionCalculations';
import { CALCULATIONS, CALCULATIONS_INITIAL, CALCULATIONS_TRANSFORMED } from 'mocks/mappersPropositionCalculations';

import { mapGetCalculationsResponse } from '../mapGetCalculationsResponse';

describe('WHEN "mapGetCalculationsResponse" is called', () => {
  it.each([undefined, null, [[null]], [[undefined]], [['']], [[{}]]])(
    'AND data was not correct as %p, MUST return initial array',
    (order) => {
      expect(mapGetCalculationsResponse(order as unknown as PropositionCalculations.GetCalculations)).toEqual(
        CALCULATIONS_INITIAL,
      );
    },
  );

  it('AND data was fully provided, MUST map correctly', () => {
    expect(mapGetCalculationsResponse(CALCULATIONS)).toEqual(CALCULATIONS_TRANSFORMED);
  });

  it('AND "" was provided, MUST map correctly', () => {
    expect(
      mapGetCalculationsResponse({
        ...CALCULATIONS,
        kbmInfo: {
          ...CALCULATIONS.kbmInfo,
          multidrive: {
            defaultKbm: 1.17,
          },
        },
      }),
    ).toEqual({
      ...CALCULATIONS_TRANSFORMED,
      multiDriveWithKbm: 1.17,
    });
  });
});
