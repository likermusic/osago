import { useCallback } from 'react';

import { CustomRouter } from 'shared/config/router';
import { useAppDispatch } from 'shared/lib/redux';
import { sendEventProlongation } from 'shared/lib/sendGAEvents';
import { ProlongationActionType } from 'shared/lib/sendGAEvents/events';

import type { CarNumberLandingFormFields } from 'entities/carInfo';
import { useGetPreviousCalculations } from 'entities/prolongation';

import { navigateWithProlongationThunk } from '../model/NavigateWithProlongation.thunks';

import { useRedirectToAnketa } from './useRedirectToAnketa';

export const useUnAuthRedirect = (formValue: CarNumberLandingFormFields) => {
  const [startPreviousCalculations] = useGetPreviousCalculations();
  const dispatch = useAppDispatch();
  const redirectToAnketaWithAutoNumber = useRedirectToAnketa();

  return useCallback(() => {
    dispatch(
      navigateWithProlongationThunk(
        () => redirectToAnketaWithAutoNumber(formValue),
        (orderHash) => {
          CustomRouter.push('propositions', { query: { orderHash } });
          sendEventProlongation(ProlongationActionType.RestoreCalculation, false);
        },
        async () => {
          const { data } = await startPreviousCalculations({ carNumber: formValue.carNumber });

          return data?.prolongationPolicyByCarNumber?.orderHash || null;
        },
      ),
    );
  }, [formValue, dispatch, redirectToAnketaWithAutoNumber, startPreviousCalculations]);
};
