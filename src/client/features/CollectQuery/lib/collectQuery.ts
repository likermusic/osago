import { removeEmptyFields } from 'shared/lib/removeEmptyFields';
import type { TBaseQuery, TOrderQuery } from 'shared/types/TCollectQuery';

import { prepareAnalyticsData } from 'entities/appConfig';

import { cookiesSelector, selectOrderQuery, selectQuery } from '../model/CollectQuery.selectors';

type TPrepareAnalyticsDataResult = ReturnType<typeof prepareAnalyticsData>;

// TODO: убрать Partial после фикса типов в removeEmptyFields https://sravni-corp.atlassian.net/browse/OS-7544 возвращет
export type TCollectQuery = Partial<TBaseQuery | TOrderQuery> & Partial<Awaited<TPrepareAnalyticsDataResult>>;

const collectAnalytics = (): ThunkResult<TPrepareAnalyticsDataResult> => async (_dispatch, getState) => {
  const { wl, base, isWl, isNonPartnerWl, originalUrl } = cookiesSelector(getState());

  const analytics = await prepareAnalyticsData({
    wl,
    base,
    isWL: isWl,
    isNonPartnerWl,
    originalUrl,
  });
  return analytics;
};

export const collectCalculationQuery = (): ThunkResult<Promise<TCollectQuery>> => async (dispatch, getState) => {
  const query = selectQuery(getState());
  const analytics = await dispatch(collectAnalytics());
  return removeEmptyFields({ ...analytics, ...query });
};

export const collectOrderQuery = (): ThunkResult<Promise<TCollectQuery>> => async (dispatch, getState) => {
  const query = selectOrderQuery(getState());
  const analytics = await dispatch(collectAnalytics());
  return removeEmptyFields({ ...analytics, ...query });
};
