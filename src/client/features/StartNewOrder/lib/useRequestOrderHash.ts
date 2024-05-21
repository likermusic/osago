import { useCallback } from 'react';

import type { PropositionCalculations } from 'commonTypes/api/propositionCalculations';

import { useAppDispatch } from 'shared/lib/redux';
import { useGetDataIfChanged } from 'shared/lib/useQueryChange/useGetDataIfChanged';

import { resetOrderAndSetLoadingStatus, useLazyCreateOrderHash } from 'entities/order';

export const useRequestOrderHash = (
  getQuery: () => ThunkResult<Promise<PropositionCalculations.PostManyOrdersRequest>>,
) => {
  const dispatch = useAppDispatch();

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

    dispatch(resetOrderAndSetLoadingStatus());
    // TODO: добавить аналитику создания хеша https://sravni-corp.atlassian.net/browse/OS-7641

    await requestOrderHash(query);

    return true;
  }, [dispatch, getQueryIfChanged, requestOrderHash]);
};
