import type { PropositionCalculations } from 'commonTypes/api/propositionCalculations';

import { useGetUrlQueryReplacer } from 'shared/lib/useReplaceUrlQuery';

import { usePollingPropositionCalculations } from './usePollingPropositionCalculations';
import { useRequestCalculationHash } from './useRequestCalculationHash';

export const useNewCalculation = (
  getQuery: () => ThunkResult<Promise<PropositionCalculations.GetCalculationsHashQuery>>,
) => {
  const requestCalculationHash = useRequestCalculationHash(getQuery);
  const startCalculationPolling = usePollingPropositionCalculations();
  const replaceUrlQuery = useGetUrlQueryReplacer();

  // (query нельзя передать напрямую, потому что внутри нее дергается запрос, поэтому передается getQuery и в качестве зависимости его указать нельзя)
  return async (isForce?: boolean) => {
    const response = await requestCalculationHash(isForce);

    if (response?.calculationHash) {
      await replaceUrlQuery({ calculationHash: response?.calculationHash });
      startCalculationPolling(response.calculationHash);

      return true;
    }

    return false;
  };
};
