import { useEffect } from 'react';

import type { PropositionCalculations } from 'commonTypes/api/propositionCalculations';

import { useRequestOrderAndCalcHash } from './useRequestOrderAndCalcHash';
import { useRequestOrderHash } from './useRequestOrderHash';

/* хук запроса нового хеша заказа и нового хеша расчета, при условии, что данные по авто или людям в квере поменялись (после изменения данных в саммари анкеты)*/
export const useGetNewOrderAndCalcHash = (
  getQuery: () => ThunkResult<Promise<PropositionCalculations.PostManyOrdersRequest>>,
  isSummaryReady: boolean,
  isRestoreCalculationLoading: boolean,
) => {
  const requestOrderAndCalcHash = useRequestOrderAndCalcHash(getQuery);
  const requestOrderHash = useRequestOrderHash(getQuery);

  // (query нельзя передать напрямую, потому что внутри нее дергается запрос, поэтому передается getQuery и в качестве зависимости его указать нельзя)
  useEffect(() => {
    if (isSummaryReady && !isRestoreCalculationLoading) {
      requestOrderHash();
    }
  }, [isRestoreCalculationLoading, isSummaryReady, requestOrderHash]);

  return requestOrderAndCalcHash;
};
