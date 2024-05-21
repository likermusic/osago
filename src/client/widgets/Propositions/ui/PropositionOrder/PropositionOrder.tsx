import { Button, Space } from '@sravni/react-design-system';
import { useIsMobile, useIsPhone } from '@sravni/react-utils';
import { useMemo } from 'react';

import { useAppSelector } from 'shared/lib/redux';
import { sendEventRetryOrderAfterError } from 'shared/lib/sendGAEvents';
import { TimeLine } from 'shared/ui/TimeLine';

import { contactsEmailSelector } from 'entities/contacts';
import { currentPolicyStartDateSelector } from 'entities/PolicyInfo';
import { PropositionCardFailed, PriceBlockWithTags, PropositionCardWithDate } from 'entities/propositionCalculations';

import { collectOrderQuery } from 'features/CollectQuery';
import { PropositionAlertsList } from 'features/PropositionAlertsList';
import { SmartTagList } from 'features/SmartTag';
import { useGetNewOrderHashAndDrafts } from 'features/StartNewOrder';

import { useSendEventPropositionStartNewOrder } from '../../lib/useSendEventPropositionStartNewOrder';
import type { IPropositionOrder } from '../../types';

import { getContent } from './PropositionOrder.constants';
import styles from './PropositionOrder.module.scss';
import { PropositionOrderTexts } from './PropositionOrder.texts';

export const PropositionOrder: FC<IPropositionOrder> = (props) => {
  const {
    paymentUrl,
    orderHash,
    orderPropositionStatus,
    isDisabled,
    company,
    productId,
    price,
    isActive,
    hasTimeLine = false,
    headerActionChildren,
    alerts,
    actionChildren,
    className,
    calcHash,
    startDate,
    searchPrice,
    tags,
    ...propositionProps
  } = props || {};
  const isOrderReady = !!paymentUrl;
  const email = useAppSelector(contactsEmailSelector);
  const currentPolicyStartDate = useAppSelector(currentPolicyStartDateSelector);

  const isMobile = useIsMobile();
  const isPhone = useIsPhone();

  const timeLineContent = useMemo(() => getContent({ email, isOrderReady }), [isOrderReady, email]);

  const startNewOrder = useGetNewOrderHashAndDrafts(collectOrderQuery);

  const { sendSelectProductEventAnalytics } = useSendEventPropositionStartNewOrder();

  if (orderPropositionStatus === 'rejected') {
    return (
      <PropositionCardFailed
        companyName={company.companyName}
        logoLink={company.logoLink}
        isActive
      >
        <PropositionAlertsList alerts={alerts} />
      </PropositionCardFailed>
    );
  }
  const handleStartNewOrder = async () => {
    startNewOrder({
      productId,
      price,
      companyId: company?.companyId ?? null,
      searchId: calcHash,
    });

    sendSelectProductEventAnalytics({
      ...props,
      // для заказа всегда отправляем тру
      isOrderInListExist: true,
    });
  };

  if (orderPropositionStatus === 'error') {
    return (
      <PropositionCardFailed
        companyName={company.companyName}
        logoLink={company.logoLink}
      >
        <PropositionAlertsList alerts={alerts} />
        <Button
          onClick={() => {
            startNewOrder({
              shouldUpdateSelectedProposition: false,
            });

            sendEventRetryOrderAfterError();
          }}
          className={styles.retryErrorBtn}
        >
          {PropositionOrderTexts.restartErrorOrder}
        </Button>
      </PropositionCardFailed>
    );
  }

  return (
    <PropositionCardWithDate
      {...propositionProps}
      className={className}
      absoluteTags={
        <SmartTagList
          tags={propositionProps.absoluteTags}
          bonuses={propositionProps.description?.bonuses}
        />
      }
      startDate={startDate || currentPolicyStartDate}
      price={price}
      company={company}
      headerActionChildren={headerActionChildren}
      isDisabled={isDisabled}
      isActive={isActive}
      actionChildren={isMobile ? null : actionChildren}
      searchPrice={searchPrice}
      tags={tags}
    >
      {(hasTimeLine || !!alerts?.length || actionChildren) && (
        <Space
          direction="vertical"
          size={isMobile ? 12 : 16}
        >
          {hasTimeLine && (
            <TimeLine
              // сбрасываем тайм лайн при новом запросе
              key={orderHash}
              content={timeLineContent}
              isInfinity
              isTimerStopped={isOrderReady}
            />
          )}

          {!!alerts?.length && (
            <PropositionAlertsList
              alerts={alerts}
              orderHash={orderHash}
              startNewOrder={handleStartNewOrder}
              isActive
            />
          )}

          {isPhone && (
            <PriceBlockWithTags
              price={price}
              searchPrice={searchPrice}
              tags={tags}
            />
          )}

          {isMobile && actionChildren}
        </Space>
      )}
    </PropositionCardWithDate>
  );
};
