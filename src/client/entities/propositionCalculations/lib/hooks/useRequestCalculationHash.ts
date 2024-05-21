import { useCallback } from 'react';

import type { PropositionCalculations } from 'commonTypes/api/propositionCalculations';

import { useAppDispatch } from 'shared/lib/redux';
import { useGetSendAnalytics } from 'shared/lib/sendAnalyticsEvents';
import { useDeeplink } from 'shared/lib/useDeeplink';
import { useGetDataIfChanged } from 'shared/lib/useQueryChange/useGetDataIfChanged';

import { resetPropositionCalculation, setPropositionStatus, useLazyGetCalculationsHash } from '../../model';

export const useRequestCalculationHash = (
  getQuery: () => ThunkResult<Promise<PropositionCalculations.GetCalculationsHashQuery>>,
) => {
  const dispatch = useAppDispatch();
  const getQueryIfChanged = useGetDataIfChanged(getQuery);

  const { params } = useDeeplink();
  const { searchId, orderOrProlongationHash, hash } = params;

  const [requestCalculationHash] = useLazyGetCalculationsHash();

  const sendAnalyticsEvent = useGetSendAnalytics();

  /**
   * @param isForce - принудительно перезапустить запрос, даже если кверя не менялась
   * */
  return useCallback(
    async (isForce?: boolean) => {
      const query = await getQueryIfChanged(isForce);

      if (!query) {
        /**
         * В запросе ничего не менялось, то нет смысла перезапускать расчет
         * Просто возвращаем флаг, что расчет не запускался
         * */
        return null;
      }

      dispatch(resetPropositionCalculation());
      dispatch(setPropositionStatus('loading'));

      sendAnalyticsEvent('osago_calculation_start');

      return requestCalculationHash({ query, searchId, orderHash: orderOrProlongationHash, hash }).unwrap();
    },
    [dispatch, getQueryIfChanged, hash, sendAnalyticsEvent, orderOrProlongationHash, requestCalculationHash, searchId],
  );
};
