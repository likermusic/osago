import type { PropositionCalculations } from 'commonTypes/api/propositionCalculations';
import { mockedNanoid } from 'mocks/helpers';

import type { ITransformedGetCalculationHash } from '../../../types';
import { mapCalculationHashResponse } from '../mapCalculationHashResponse';

const NANO_ID_HASH = 'aadasddadadhg';

const DATA_TRANSFORMED: ITransformedGetCalculationHash = {
  calculationHash: 'pjf_OJDPygMSTlzIJIXthg',
  isShowPromoField: true,
};

const DATA_INCORRECT: PropositionCalculations.PostManyOrders = {
  hash: '7df32b52a',
};

const DATA_ERROR: ITransformedGetCalculationHash = {
  calculationHash: null,
  propositionStatus: 'error',
  isShowPromoField: false,
};

describe('WHEN "mapCalculationHashResponse" is called', () => {
  it.each([DATA_INCORRECT, undefined, null, {}, ''])(
    'AND data was not correct as %p, MUST return initial array',
    (order) => {
      expect(mapCalculationHashResponse(order as unknown as PropositionCalculations.PostManyOrders)).toEqual(
        DATA_ERROR,
      );
    },
  );

  it('AND data was fully provided, MUST map correctly', () => {
    mockedNanoid.mockReturnValue(NANO_ID_HASH);

    expect(mapCalculationHashResponse({ hash: 'pjf_OJDPygMSTlzIJIXthg', showPromoField: true })).toEqual(
      DATA_TRANSFORMED,
    );
  });
});
