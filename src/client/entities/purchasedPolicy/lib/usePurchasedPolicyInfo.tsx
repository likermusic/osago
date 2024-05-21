import { useEffect } from 'react';

import { useAppSelector } from 'shared/lib/redux';
import { sendEventLoadSuccessPage } from 'shared/lib/sendGAEvents';

import { useGetOrderInfo } from '../model/purchasedPolicy.query';
import { purchasedPolicyInfoSelector } from '../model/purchasedPolicy.selectors';

export const usePurchasedPolicyInfo = (orderHash?: string | string[]) => {
  const [loadOrder, { isError }] = useGetOrderInfo();

  useEffect(() => {
    if (orderHash) {
      loadOrder(orderHash);
    }
  }, [loadOrder, orderHash]);

  const policyInfo = useAppSelector(purchasedPolicyInfoSelector);

  useEffect(() => {
    if (policyInfo) {
      sendEventLoadSuccessPage(policyInfo?.company?.name, policyInfo?.price);
    } else if (isError) {
      sendEventLoadSuccessPage();
    }
  }, [isError, policyInfo]);

  return { policyInfo, isError };
};
