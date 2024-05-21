import { useCallback, useEffect } from 'react';

import type { PoliciesDrafts } from 'commonTypes/api/policiesDrafts';

import { useAppDispatch } from 'shared/lib/redux';

import { useGetPoliciesDrafts } from '../model/policyDraft.query';

export const useLoadPoliciesDrafts = (
  getQuery: () => ThunkResult<Promise<PoliciesDrafts.Request>>,
  companyId: Nullable<number>,
  isFormReady: boolean,
) => {
  const dispatch = useAppDispatch();

  const [getPoliciesDrafts, { isLoading: isDraftsLoading }] = useGetPoliciesDrafts();

  const getDrafts = useCallback(async () => {
    if (companyId) {
      const query = await dispatch(getQuery());
      getPoliciesDrafts({ query, companyId });
    }
  }, [companyId, dispatch, getPoliciesDrafts, getQuery]);

  useEffect(() => {
    if (isFormReady) {
      // Дергаем каждый раз при входе на страницу, тк в одной ручке получаем и драфт полиса и драфт полиса апсейла(с доп правилами)
      getDrafts();
    }
  }, [getDrafts, companyId, isFormReady]);

  return { getDrafts, isDraftsLoading };
};
