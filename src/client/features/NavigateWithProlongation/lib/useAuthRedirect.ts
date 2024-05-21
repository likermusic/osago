import { useCallback } from 'react';

import { CustomRouter } from 'shared/config/router';
import { useAppSelector } from 'shared/lib/redux';
import { sendEventProlongation } from 'shared/lib/sendGAEvents';
import { ProlongationActionType } from 'shared/lib/sendGAEvents/events';

import type { CarNumberLandingFormFields } from 'entities/carInfo';
import { normalizedProlongationInfoSelector } from 'entities/prolongation';

import { useRedirectToAnketa } from './useRedirectToAnketa';

export const useAuthRedirect = (formValue: CarNumberLandingFormFields) => {
  const { orderHash } = useAppSelector(normalizedProlongationInfoSelector) || {};
  const redirectToAnketaWithAutoNumber = useRedirectToAnketa();
  return useCallback(async () => {
    if (orderHash) {
      sendEventProlongation(ProlongationActionType.RestoreCalculation, true);
      CustomRouter.push('propositions', { query: { orderHash } });

      return;
    }

    return redirectToAnketaWithAutoNumber(formValue);
  }, [formValue, orderHash, redirectToAnketaWithAutoNumber]);
};
