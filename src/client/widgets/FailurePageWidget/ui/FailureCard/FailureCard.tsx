import { Card, Space } from '@sravni/react-design-system';
import { useEffect } from 'react';

import { sendEventLoadFailurePage } from 'shared/lib/sendGAEvents';

import { usePurchasedPolicyInfo, FailureCard as OrderFailureCard } from 'entities/purchasedPolicy';

import { RedirectOnOrderPage } from 'features/RetryPayment';

type IFailureCardProps = {
  orderHash: string;
};

export const FailureCard: FC<IFailureCardProps> = ({ orderHash }) => {
  const { policyInfo, isError } = usePurchasedPolicyInfo(orderHash);

  useEffect(() => {
    if (isError) {
      sendEventLoadFailurePage();
    } else if (policyInfo) {
      sendEventLoadFailurePage(policyInfo?.company?.name, policyInfo?.price);
    }
  }, [policyInfo, isError]);

  return (
    <Card size={16}>
      <Space
        size={16}
        direction="vertical"
      >
        <OrderFailureCard />

        <RedirectOnOrderPage
          price={policyInfo?.price}
          orderHash={orderHash}
        />
      </Space>
    </Card>
  );
};
