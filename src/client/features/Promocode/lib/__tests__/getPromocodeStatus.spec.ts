import type { IDetailAlert } from 'shared/types/IAlert';

import type { PropositionCalculationsState } from 'entities/propositionCalculations';

import type { TPromocodeStatus } from '../../types';
import { getPromocodeStatus } from '../getPromocodeStatus';

describe('WHEN "getPromocodeStatus" is called', () => {
  it.each([
    [[], null, false, 'invisible'],
    [[], null, true, 'input'],
    [[], 'promocode', true, 'loading'],
    [undefined, 'promocode', true, 'loading'],
    [[{}], 'promocode', true, 'success'],
  ] as unknown as Array<[IDetailAlert[], PropositionCalculationsState['promocode'], boolean, TPromocodeStatus]>)(
    'AND alerts was %p, promocode %p, isShowPromoField %p, MUST return %p status',
    (alerts, promocode, isShowPromoField, result) => {
      expect(getPromocodeStatus(alerts, promocode, isShowPromoField)).toEqual(result);
    },
  );
});
