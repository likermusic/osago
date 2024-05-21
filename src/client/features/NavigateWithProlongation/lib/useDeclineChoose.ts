import { useCallback } from 'react';

import { useAppSelector } from 'shared/lib/redux';
import { sendEventProlongation } from 'shared/lib/sendGAEvents';
import { ProlongationActionType } from 'shared/lib/sendGAEvents/events';

import type { CarNumberLandingFormFields } from 'entities/carInfo';
import { isUserLoggedInSelector } from 'entities/user';

import { useRedirectToAnketa } from './useRedirectToAnketa';

export const useDeclineChoose = (formValue: CarNumberLandingFormFields) => {
  const isUserAuthorized = useAppSelector(isUserLoggedInSelector);
  const redirectToAnketaWithAutoNumber = useRedirectToAnketa();

  return useCallback(async () => {
    sendEventProlongation(ProlongationActionType.NewCalculation, isUserAuthorized);
    redirectToAnketaWithAutoNumber(formValue);
  }, [formValue, isUserAuthorized, redirectToAnketaWithAutoNumber]);
};
