import { useCallback, useEffect } from 'react';

import type { PropositionCalculations } from 'commonTypes/api/propositionCalculations';

import { MAX_POLLING_PERIOD_PROPOSITION, POLLING_PERIOD_PROPOSITION } from 'shared/config/POLLING_PERIOD';
import { Polling } from 'shared/lib/Polling';
import { useAppDispatch } from 'shared/lib/redux';
import { useGetSendAnalytics } from 'shared/lib/sendAnalyticsEvents';

import {
  setPropositionCalculation,
  setPropositionStatus,
  updateStoreWhenCalculationPollingFinishedByTime,
} from '../../model';
import { mapGetCalculationsResponse } from '../helpers/mapGetCalculationsResponse';

const calculationPollingController = new Polling<PropositionCalculations.GetCalculations>({
  maxPollingIntervalMs: MAX_POLLING_PERIOD_PROPOSITION,
  pollingIntervalMs: POLLING_PERIOD_PROPOSITION,
  urlKey: 'getPropositionCalculations',
});

export const usePollingPropositionCalculations = () => {
  const dispatch = useAppDispatch();

  const sendAnalyticsEvent = useGetSendAnalytics();

  calculationPollingController.setOnSuccess((data, isFinished) => {
    const mappedData = mapGetCalculationsResponse(data);
    dispatch(setPropositionCalculation(mappedData));

    const { propositionStatus } = mappedData;

    if (propositionStatus && propositionStatus !== 'loading') {
      calculationPollingController.stopPolling();
    }

    if (isFinished) {
      dispatch(updateStoreWhenCalculationPollingFinishedByTime());
    }
  });

  calculationPollingController.setOnError(() => dispatch(setPropositionStatus('error')));

  useEffect(() => () => calculationPollingController.stopPolling(), []);

  return useCallback(
    (calcHash?: Nullable<string>) => {
      if (calcHash) {
        calculationPollingController.startPolling({ calcHash });
        sendAnalyticsEvent('osago_contact_step4_data');
      }
    },
    [sendAnalyticsEvent],
  );
};
