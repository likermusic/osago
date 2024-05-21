import { useBoolean } from '@sravni/react-utils';
import { useEffect } from 'react';

import { CrossSalesStatuses } from 'shared/config/cross';
import { sendEventCrossShow } from 'shared/lib/sendGAEvents';
import { CrossStatusesType } from 'shared/lib/sendGAEvents/events';

import type { ICrossCalculationsResult } from '../types';

export const useIsCrossSalesShown = (crossCalculations: ICrossCalculationsResult) => {
  const [isCrossSalesShown, setCrossSalesShown] = useBoolean(true);

  const isFinishStatus = crossCalculations?.status === CrossSalesStatuses.finished;
  const isErrorStatus = crossCalculations?.status === CrossSalesStatuses.error;
  const isNoProductsStatus = crossCalculations?.status === CrossSalesStatuses.noProducts;
  const isCrossPropositionNotEmpty = crossCalculations?.propositions?.length > 0;

  useEffect(() => {
    if (isFinishStatus && isCrossPropositionNotEmpty) {
      setCrossSalesShown.on();
      sendEventCrossShow(CrossStatusesType.Success, crossCalculations?.propositions?.length);
    } else if (isNoProductsStatus || (isFinishStatus && !isCrossPropositionNotEmpty) || isErrorStatus) {
      setCrossSalesShown.off();
      sendEventCrossShow(CrossStatusesType.Failure, crossCalculations?.propositions?.length);
    }
  }, [
    setCrossSalesShown,
    isFinishStatus,
    isCrossPropositionNotEmpty,
    isNoProductsStatus,
    isErrorStatus,
    crossCalculations?.propositions?.length,
  ]);

  return isCrossSalesShown;
};
