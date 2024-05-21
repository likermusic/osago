import type { PropositionCalculations } from 'commonTypes/api/propositionCalculations';
import { mockedNanoid } from 'mocks/helpers';
import { ORDER } from 'mocks/orderHash';

import type { TGetOrderHash } from '../../../types';
import { mapOrderHashResponse } from '../mapOrderHashResponse';

const DATA_TRANSFORMED: TGetOrderHash = {
  orderHash: '7df382fd646749f884f022509a9481f7d700eb6bf4d147b4b44e11302b52de4a',
  orderUniqueHash: 'adsasddsdsa',
};

const DATA_WITHOUT_DRAFT_FULL_URL: PropositionCalculations.PostManyOrders = {
  hash: '7df382fd646749f884f022509a9481f7d700eb6bf4d147b4b44e11302b52de4a',
};

const DATA_WITHOUT_DRAFT_FULL_URL_TRANSFORMED: TGetOrderHash = {
  orderHash: '7df382fd646749f884f022509a9481f7d700eb6bf4d147b4b44e11302b52de4a',
  orderUniqueHash: 'adsasddsdsa',
};

const DATA_INCORRECT: PropositionCalculations.PostManyOrders = {
  hash: '7df382fd646749f884f022509a9481f7d700eb6bf4d147b4b44e11302b52a',
  draftFullUrl:
    'https://osagopolicy.yc.dev.sravni-team.ru/dl/osago/drafts/generated/7df382fd646749f884f022509a9481f7d700eb6bf4d147b4b44e11302b52de4a.pdf?jpg=1',
};

const DATA_ERROR: TGetOrderHash = {
  orderHash: null,
  orderUniqueHash: null,
};

describe('WHEN "mapOrderHashResponse" is called', () => {
  it.each([DATA_INCORRECT, undefined, null, {}, ''])(
    'AND data was not correct as %p, MUST return initial array',
    (order) => {
      mockedNanoid.mockReturnValue(DATA_ERROR.orderUniqueHash);

      expect(mapOrderHashResponse(order as unknown as PropositionCalculations.PostManyOrders)).toEqual(DATA_ERROR);
    },
  );

  it('AND data was provided without draftFullUrl, MUST map correctly', () => {
    mockedNanoid.mockReturnValue(DATA_WITHOUT_DRAFT_FULL_URL_TRANSFORMED.orderUniqueHash);

    expect(mapOrderHashResponse(DATA_WITHOUT_DRAFT_FULL_URL)).toEqual(DATA_WITHOUT_DRAFT_FULL_URL_TRANSFORMED);
  });

  it('AND data was fully provided, MUST map correctly', () => {
    mockedNanoid.mockReturnValue(DATA_TRANSFORMED.orderUniqueHash);

    expect(mapOrderHashResponse(ORDER)).toEqual(DATA_TRANSFORMED);
  });
});
