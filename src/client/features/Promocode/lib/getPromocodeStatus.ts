import type { IDetailAlert } from 'shared/types/IAlert';

import type { PropositionCalculationsState } from 'entities/propositionCalculations';

import type { TPromocodeStatus } from '../types';

export const getPromocodeStatus = (
  alerts: IDetailAlert[],
  promocode: PropositionCalculationsState['promocode'],
  isShowPromoField: boolean,
): TPromocodeStatus => {
  if (!isShowPromoField) {
    return 'invisible';
  }

  if (promocode) {
    if (!alerts?.length) return 'loading';
    if (alerts.length > 0) return 'success';
  }

  return 'input';
};
