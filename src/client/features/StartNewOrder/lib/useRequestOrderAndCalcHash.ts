import { NotificationManager } from '@sravni/react-design-system';
import { useCallback } from 'react';

import type { PropositionCalculations } from 'commonTypes/api/propositionCalculations';

import { useAppDispatch } from 'shared/lib/redux';
import { sendSentryClientError } from 'shared/lib/sendSentryClientError';
import { useDeeplink } from 'shared/lib/useDeeplink';
import { useGetDataIfChanged } from 'shared/lib/useQueryChange/useGetDataIfChanged';

import { useLazyCreateOrderHash, resetOrderAndSetLoadingStatus } from 'entities/order';
import { useLazyGetCalculationsHash } from 'entities/propositionCalculations';
import { updateSelectedPropositionPartial } from 'entities/selectedProposition';

import { StartNewOrderTexts } from '../StartNewOrder.texts';

export const useRequestOrderAndCalcHash = (
  getQuery: () => ThunkResult<Promise<PropositionCalculations.PostManyOrdersRequest>>,
) => {
  const dispatch = useAppDispatch();

  const { params } = useDeeplink();
  const { searchId, orderOrProlongationHash, hash } = params;
  const [requestCalculationHash] = useLazyGetCalculationsHash();

  const getQueryIfChanged = useGetDataIfChanged(getQuery);

  const [requestOrderHash] = useLazyCreateOrderHash();

  return useCallback(async () => {
    const query = await getQueryIfChanged();

    if (!query) {
      /**
       * В запросе ничего не менялось, то нет смысла перезапускать расчет
       * Просто возвращаем флаг, что расчет не запускался
       * */
      return false;
    }
    dispatch(updateSelectedPropositionPartial({ price: null }));

    dispatch(resetOrderAndSetLoadingStatus());
    // TODO: добавить аналитику создания хеша https://sravni-corp.atlassian.net/browse/OS-7641

    // При изменении данных в саммари мы должны создать расчет с новыми данным
    // т.к. бек пулит по searchId пробросы и они будут с устаревшими ценами
    const { data } = await requestCalculationHash({
      query: { ...query, policyStartDate: query?.policyStartDate ?? undefined },
      searchId,
      orderHash: orderOrProlongationHash,
      hash,
    });

    if (!data) {
      NotificationManager.show(StartNewOrderTexts.notificationGetCalcHashError, '', '', 5000, 'error');

      sendSentryClientError(StartNewOrderTexts.notificationGetCalcHashError);
      return;
    }

    dispatch(updateSelectedPropositionPartial({ searchId: data.calculationHash }));

    const updatedQuery = { ...query, save: { ...query.save, searchId: data.calculationHash } };

    await requestOrderHash(updatedQuery);

    return true;
  }, [dispatch, getQueryIfChanged, hash, orderOrProlongationHash, requestCalculationHash, requestOrderHash, searchId]);
};
