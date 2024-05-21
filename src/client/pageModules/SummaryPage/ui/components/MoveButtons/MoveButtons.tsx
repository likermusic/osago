import { Space, Button, Icon } from '@sravni/react-design-system';
import { ArrowLeft } from '@sravni/react-icons';

import { CustomRouter } from 'shared/config/router';
import { useGetSendAnalytics } from 'shared/lib/sendAnalyticsEvents';

import { SummaryPageTexts } from 'pageModules/SummaryPage/SummaryPage.texts';

import styles from './MoveButtons.module.scss';

export const MoveButtons: FC<{ isLoading: boolean; isDisabled: boolean }> = ({ className, isLoading, isDisabled }) => {
  const sendAnalyticsEvent = useGetSendAnalytics();

  const redirectToPropositions = () => {
    CustomRouter.push('propositions');
  };
  const redirectToOrder = () => {
    sendAnalyticsEvent('osago_contact_order');
    CustomRouter.push('order');
  };

  return (
    <Space
      justify="space-between"
      className={className}
    >
      <Button onClick={redirectToPropositions}>
        <Icon icon={<ArrowLeft />} />
        {SummaryPageTexts.backBtn}
      </Button>

      <Button
        onClick={redirectToOrder}
        variant="primary"
        loading={isLoading}
        disabled={isDisabled}
        className={styles.acceptBtn}
      >
        {SummaryPageTexts.acceptBtn}
      </Button>
    </Space>
  );
};
