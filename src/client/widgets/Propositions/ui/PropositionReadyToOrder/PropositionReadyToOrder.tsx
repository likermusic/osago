import { Button, Space } from '@sravni/react-design-system';
import { useIsMobile } from '@sravni/react-utils';

import { setActiveElementFlag } from 'shared/lib/activeElementClickInterceptor';

import { PropositionCardMain } from 'entities/propositionCalculations';

import { PropositionAlertsList } from 'features/PropositionAlertsList';
import { PropositionDetail, useTogglePropositionDetails } from 'features/PropositionDetail';
import { SmartTagList } from 'features/SmartTag';

import { useSendEventPropositionDetail } from 'widgets/Propositions/lib/useSendEventPropositionDetail';

import { useSendEventPropositionStartNewOrder } from '../../lib/useSendEventPropositionStartNewOrder';
import type { IPropositionReadyToOrder } from '../../types';

import styles from './PropositionReadyToOrder.module.scss';

export const PropositionReadyToOrder: FC<IPropositionReadyToOrder> = (props) => {
  const { company, description, isOrderInListExist, alerts, handleStartNewOrder, buttonTitle, ...propositionProps } =
    props;

  const isMobile = useIsMobile();
  const { isCardDetailsOpened, togglePropositionDetails, openPropositionDetails } = useTogglePropositionDetails();
  const { sendSelectProductEventAnalytics } = useSendEventPropositionStartNewOrder();
  const { sendPropositionDetailEventAnalytics } = useSendEventPropositionDetail({
    ...props,
    // для заказа всегда отправляем тру
    isOrderInListExist: true,
  });

  const commonStartNewOrderProps = {
    onClick: () => {
      handleStartNewOrder();

      // TODO: вынести аналитику выбора компании выше чтобы на пробросе и выдаче была разная https://sravni-corp.atlassian.net/browse/OS-7641
      sendSelectProductEventAnalytics({
        ...props,
        // для заказа всегда отправляем тру
        isOrderInListExist: true,
      });
    },
    variant: isOrderInListExist ? 'outlined' : 'primary',
  } as const;

  const actionChildren = (
    <Space
      size={12}
      direction={isMobile ? 'row-reverse' : 'horizontal'}
      onClick={setActiveElementFlag}
    >
      <Button
        {...commonStartNewOrderProps}
        className={styles.payFeature}
      >
        {buttonTitle}
      </Button>

      <PropositionDetail
        isOpenDetails={isCardDetailsOpened}
        onPopupChangeState={togglePropositionDetails}
        company={company}
        description={description}
        sendEventAnalytics={sendPropositionDetailEventAnalytics}
      >
        <Button
          {...commonStartNewOrderProps}
          className={styles.payBtnDetail}
          size={52}
        >
          {buttonTitle}
        </Button>
      </PropositionDetail>
    </Space>
  );

  return (
    <PropositionCardMain
      {...propositionProps}
      absoluteTags={
        <SmartTagList
          tags={propositionProps.absoluteTags}
          bonuses={description?.bonuses}
        />
      }
      onCardClick={openPropositionDetails}
      company={company}
      headerActionChildren={isMobile ? undefined : actionChildren}
    >
      {(alerts?.length > 0 || isMobile) && (
        <Space
          direction="vertical"
          size={isMobile ? 12 : 16}
        >
          {alerts?.length > 0 && <PropositionAlertsList alerts={alerts} />}
          {isMobile && actionChildren}
        </Space>
      )}
    </PropositionCardMain>
  );
};
