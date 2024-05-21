import { useEffect } from 'react';

import { MAX_POLLING_PERIOD } from 'constants/pollingPeriod';

import { usePolling } from 'shared/lib/Polling';

import { useGetPolicyLink } from '../model/purchasedPolicy.query';

const POLLING_PERIOD = 10000;

export const useLoadPolicyLink = (orderHash?: string | string[]) => {
  const [startRequest, { data, error: rtkError }] = useGetPolicyLink({
    pollingInterval: POLLING_PERIOD,
  });

  const { stopPoling, startPoling, error } = usePolling(startRequest, POLLING_PERIOD, MAX_POLLING_PERIOD, rtkError);

  useEffect(() => {
    if (orderHash) {
      startPoling(orderHash);
    }
  }, [orderHash, startPoling]);

  useEffect(() => {
    if (data?.archiveLink && data?.policyLink) {
      stopPoling();
    }
  }, [error, data, stopPoling]);
};
