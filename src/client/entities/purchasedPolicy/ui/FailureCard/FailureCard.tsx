import { Alert, Space } from '@sravni/react-design-system';
import { Warning } from '@sravni/react-icons';

import { useAppSelector } from 'shared/lib/redux';
import { CompanyLogo } from 'shared/ui/CompanyLogo';
import { IconCenter } from 'shared/ui/IconCenter';

import { purchasedPolicyInfoSelector } from '../../model/purchasedPolicy.selectors';

import { FailureCardTexts } from './FailureCard.text';

export const FailureCard: FC = () => {
  const orderInfo = useAppSelector(purchasedPolicyInfoSelector);

  return (
    <Space
      direction="vertical"
      size={16}
    >
      {orderInfo?.company && (
        <CompanyLogo
          companyName={orderInfo.company.name}
          companyIconUrl={orderInfo.company.logoUrl}
        />
      )}

      <Alert
        color="red"
        title={FailureCardTexts.errorMessage}
        icon={
          <IconCenter
            background="white"
            color="red"
            size={16}
            shape="circle"
          >
            <Warning />
          </IconCenter>
        }
      />
    </Space>
  );
};
