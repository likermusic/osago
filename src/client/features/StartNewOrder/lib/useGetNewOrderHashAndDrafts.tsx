import { useCallback } from 'react';

import type { PoliciesDrafts } from 'commonTypes/api/policiesDrafts';

import { useAppDispatch, useAppSelector } from 'shared/lib/redux';
import { useOrderPageScroll } from 'shared/lib/usePageScroll/useOrderPageScroll';

import { resetOrderAndSetLoadingStatus, useLazyCreateOrderHash } from 'entities/order';
import { useLoadPoliciesDrafts } from 'entities/PolicyDraft';
import { selectedPropositionSelector, updateSelectedProposition } from 'entities/selectedProposition';

interface IUseStartNewOrder {
  productId: Nullable<number>;
  price: Nullable<number>;
  companyId: Nullable<number>;
  shouldUpdateSelectedProposition?: true;
  searchId: Nullable<string>;
}

type TUseStartNewOrder = IUseStartNewOrder | { shouldUpdateSelectedProposition: false };

/* хук запроса нового хеша заказа, при условии, что данные по авто или людям в квере не поменялись (отказ от апсейла, пробросы)*/
export const useGetNewOrderHashAndDrafts = (getQuery: () => ThunkResult<Promise<PoliciesDrafts.Request>>) => {
  const dispatch = useAppDispatch();
  const { activeCompanyId: companyId } = useAppSelector(selectedPropositionSelector) || {};

  const { getDrafts } = useLoadPoliciesDrafts(getQuery, companyId, false);
  const [requestOrderHash] = useLazyCreateOrderHash();

  const { navigateToActiveOrder } = useOrderPageScroll();

  return useCallback(
    async (props: TUseStartNewOrder) => {
      dispatch(resetOrderAndSetLoadingStatus());

      (props.shouldUpdateSelectedProposition === undefined || props.shouldUpdateSelectedProposition) &&
        dispatch(
          updateSelectedProposition({
            productId: props.productId,
            price: props.price,
            activeCompanyId: props.companyId,
            searchId: props.searchId,
          }),
        );
      const query = await dispatch(getQuery());
      requestOrderHash(query);

      getDrafts();
      navigateToActiveOrder();
    },
    [dispatch, navigateToActiveOrder, getQuery, requestOrderHash, getDrafts],
  );
};
