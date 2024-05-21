import { Alert } from '@sravni/react-design-system';
import { Warning } from '@sravni/react-icons';
import { useBoolean } from '@sravni/react-utils';
import React from 'react';
import { useInView } from 'react-intersection-observer';

import {
  redirectToLandingWithReplaceAndClearQueryParams,
  redirectToPropositionsWithReplaceAndClearQueryParams,
} from 'shared/config/router';
import { useAppSelector } from 'shared/lib/redux';
import { ANKETA_ID } from 'shared/lib/usePageScroll';
import { useOrderPageScroll } from 'shared/lib/usePageScroll/useOrderPageScroll';
import { NoSSR } from 'shared/ui';

import { orderAlertsSelector, shouldShowForwardingPropositionsSelector, useOrderPolling } from 'entities/order';
import { useLoadPoliciesDrafts } from 'entities/PolicyDraft';
import { selectedPropositionSelector, useRestoreFormattedPriceAndCompany } from 'entities/selectedProposition';

import { AfterPayment } from 'features/AfterPayment';
import { collectOrderQuery } from 'features/CollectQuery';
import { RaffleBanner } from 'features/RaffleBanner';
import { useRestoreCalculation } from 'features/RestoreQueryFromUrl';
import { isSaveInQueryValid } from 'features/RestoreQueryFromUrl/lib/utils/isSaveInQueryValid';
import { useGetNewOrderAndCalcHash } from 'features/StartNewOrder';

import { OrderShortInfoSticky } from 'src/client/widgets/PropositionOrderSticky';
import { formReadyForSendingSelector, stepperConfigWithDateSelector, UserDataSummary } from 'widgets/AnketaWidget';

import { nonNullableOrderSelector } from '../../ActiveOrder.selectors';
import { ActiveOrder } from '../ActiveOrder/ActiveOrder';
import { ForwardingPropositionsList } from '../ForwardingPropositionsList';

import styles from './OrderPage.module.scss';
import { BannerTexts, OrderPageTexts } from './OrderPage.texts';

export const OrderPage = () => {
  const isSummaryReady = useAppSelector(formReadyForSendingSelector);
  const { checkPriceValidation } = useRestoreFormattedPriceAndCompany();

  const { isLoading: isRestoreOrderLoading } = useRestoreCalculation({
    errorCallback: redirectToLandingWithReplaceAndClearQueryParams,
    shouldUseStoreFirst: isSummaryReady,
    successCallback: (data) => {
      // если успешно восстановили данные, но в квере нет save, значит расчет стух и отправляем на выдачу
      data !== null && !isSaveInQueryValid(data) && redirectToPropositionsWithReplaceAndClearQueryParams();
      checkPriceValidation();
    },
  });

  const [isAnketaOpened, setIsAnketaOpened] = useBoolean(false);
  useOrderPolling();
  const { ref, inView: isBlockInView } = useInView({
    initialInView: true,
    threshold: 0,
  });

  const shouldShowForwardingPropositions = useAppSelector(shouldShowForwardingPropositionsSelector);
  const requestOrderHash = useGetNewOrderAndCalcHash(collectOrderQuery, isSummaryReady, isRestoreOrderLoading);
  const steps = useAppSelector(stepperConfigWithDateSelector);
  const order = useAppSelector(nonNullableOrderSelector);
  const orderAlerts = useAppSelector(orderAlertsSelector);

  const { activeCompanyId: companyId } = useAppSelector(selectedPropositionSelector) || {};
  const { getDrafts, isDraftsLoading } = useLoadPoliciesDrafts(collectOrderQuery, companyId, isSummaryReady);

  const { activeOrderId, navigateToActiveOrder } = useOrderPageScroll();

  const onSummaryDataChanged = async () => {
    const isOrderCalculationStarted = await requestOrderHash();

    if (isOrderCalculationStarted) {
      getDrafts();
      navigateToActiveOrder();
    }
  };

  return (
    <NoSSR>
      <div className={styles.pageWrapper}>
        <UserDataSummary
          scrollId={ANKETA_ID}
          isLoading={isRestoreOrderLoading}
          isOpened={isAnketaOpened}
          onDataChanged={onSummaryDataChanged}
          toggleIsOpened={setIsAnketaOpened.toggle}
          customTitle={OrderPageTexts.title}
          customSubtitle={OrderPageTexts.subtitle}
          steps={steps}
          isExtendedData
        />

        {orderAlerts?.map(({ title, subtitle, color, variant }) => (
          <Alert
            key={title + subtitle}
            className="h-mt-16"
            title={title}
            subtitle={subtitle}
            color={color}
            variant={variant}
            icon={<Warning />}
          />
        ))}

        <div className={styles.contentWrapper}>
          <div
            ref={ref}
            className="h-mb-24"
            id={activeOrderId}
          >
            <ActiveOrder />
          </div>

          {shouldShowForwardingPropositions && <ForwardingPropositionsList />}

          <RaffleBanner
            config={BannerTexts}
            variant="infoModal"
            className="h-mb-40"
          />

          <AfterPayment
            isDraftsLoading={isDraftsLoading}
            className={styles.afterPayment}
          />
        </div>

        {!isBlockInView && <OrderShortInfoSticky order={order} />}
      </div>
    </NoSSR>
  );
};
