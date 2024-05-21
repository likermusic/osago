import { getIsNeededABVariant } from 'shared/lib/getIsNeededABVariant';

import { analyticsABTestStatisticsSelector } from '../model/appConfig.selectors';

export const getIsNeededABVariantThunk =
  (experimentName: string, variant: string): ThunkResult<boolean> =>
  (_, getState) =>
    getIsNeededABVariant(experimentName, variant, analyticsABTestStatisticsSelector(getState()));
