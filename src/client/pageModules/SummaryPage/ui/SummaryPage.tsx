import { NotificationManager } from '@sravni/react-design-system';
import { useBoolean, useIsMobile } from '@sravni/react-utils';
import { useCallback } from 'react';

import {
  redirectToLandingWithReplaceAndClearQueryParams,
  redirectToPropositionsWithReplaceAndClearQueryParams,
} from 'shared/config/router';
import { useAppDispatch, useAppSelector } from 'shared/lib/redux';
import { sendSentryClientError } from 'shared/lib/sendSentryClientError';
import { ANKETA_ID } from 'shared/lib/usePageScroll';
import { usePrefetchNextPages } from 'shared/lib/usePrefetchNextPages';
import { useGetDataIfChanged } from 'shared/lib/useQueryChange/useGetDataIfChanged';
import { useReplaceUrlQuery } from 'shared/lib/useReplaceUrlQuery';
import { NoSSR } from 'shared/ui';

import { useLoadPoliciesDrafts } from 'entities/PolicyDraft';
import { useLazyGetCalculationsHash } from 'entities/propositionCalculations';
import {
  selectedPropositionSelector,
  updateSelectedPropositionPartial,
  useRestoreFormattedPriceAndCompany,
} from 'entities/selectedProposition';

import { AfterPayment } from 'features/AfterPayment';
import { AuthenticationPopupSummaryPage } from 'features/Authentication';
import { collectCalculationQuery, collectOrderQuery } from 'features/CollectQuery';
import { RaffleBanner } from 'features/RaffleBanner';
import { useRestoreCalculation } from 'features/RestoreQueryFromUrl';
import { isSaveInQueryValid } from 'features/RestoreQueryFromUrl/lib/utils/isSaveInQueryValid';
import { StartNewOrderTexts } from 'features/StartNewOrder';

import { formReadyForSendingSelector, stepperConfigWithDateSelector, UserDataSummary } from 'widgets/AnketaWidget';

import { NOTIFICATION_TIME } from '../constants';
import { BannerTexts, SummaryPageTexts } from '../SummaryPage.texts';

import { MoveButtons } from './components/MoveButtons/MoveButtons';
import { PriceBlock } from './components/PriceBlock';
import styles from './SummaryPage.module.scss';

export const SummaryPage = () => {
  const isSummaryReady = useAppSelector(formReadyForSendingSelector);
  usePrefetchNextPages();
  const { isPriceLoading, checkPriceValidation } = useRestoreFormattedPriceAndCompany();

  const dispatch = useAppDispatch();
  const { isLoading: isDataLoading } = useRestoreCalculation({
    errorCallback: redirectToLandingWithReplaceAndClearQueryParams,
    shouldUseStoreFirst: isSummaryReady,
    successCallback: (data) => {
      // если успешно восстановили данные, но в квере нет save, значит расчет стух и отправляем на выдачу
      data !== null && !isSaveInQueryValid(data) && redirectToPropositionsWithReplaceAndClearQueryParams();

      checkPriceValidation();
    },
  });

  useReplaceUrlQuery();

  const { activeCompanyId: companyId, isDataChangedOnSummary, price } = useAppSelector(selectedPropositionSelector);
  const { getDrafts, isDraftsLoading } = useLoadPoliciesDrafts(collectOrderQuery, companyId, isSummaryReady);
  const [isAnketaOpened, setIsAnketaOpened] = useBoolean(true);

  const isMobile = useIsMobile();

  const [requestCalculationHash, { isFetching: isNewCalculationLoading, isError }] = useLazyGetCalculationsHash();
  const getQueryIfChanged = useGetDataIfChanged(collectCalculationQuery);

  const handleDataChanged = useCallback(async () => {
    const query = await getQueryIfChanged();

    if (query) {
      dispatch(updateSelectedPropositionPartial({ price: null, isDataChangedOnSummary: true }));
      getDrafts();

      const { data } = await requestCalculationHash({ query });

      if (!data) {
        NotificationManager.show(StartNewOrderTexts.notificationGetCalcHashError, '', '', NOTIFICATION_TIME, 'error');

        sendSentryClientError(StartNewOrderTexts.notificationGetCalcHashError);
        return;
      }

      dispatch(updateSelectedPropositionPartial({ searchId: data?.calculationHash }));
    }
  }, [dispatch, getDrafts, getQueryIfChanged, requestCalculationHash]);

  const steps = useAppSelector(stepperConfigWithDateSelector);

  const isButtonsLoading = isDataLoading || isNewCalculationLoading || isPriceLoading;

  return (
    <NoSSR>
      <>
        <div className={styles.pageWrapper}>
          <UserDataSummary
            scrollId={ANKETA_ID}
            isLoading={isDataLoading}
            isOpened={isAnketaOpened}
            onDataChanged={handleDataChanged}
            toggleIsOpened={setIsAnketaOpened.toggle}
            customTitle={SummaryPageTexts.title}
            customSubtitle={SummaryPageTexts.subtitle}
            steps={steps}
            isExtendedData
          />

          <div className={styles.contentWrapper}>
            <PriceBlock
              isDataChangedOnSummary={!!isDataChangedOnSummary}
              isPriceLoading={isPriceLoading}
              price={price}
            />

            {!isMobile && (
              <MoveButtons
                className="h-mt-32"
                isLoading={isButtonsLoading}
                isDisabled={isError}
              />
            )}
            <RaffleBanner
              config={BannerTexts}
              variant="infoModal"
              className="h-mt-24 h-mb-24"
            />

            <AfterPayment
              isDraftsLoading={isDraftsLoading}
              className={styles.afterPayment}
            />
          </div>
        </div>

        {isMobile && (
          <MoveButtons
            className={styles.stickyMoveButtons}
            isLoading={isButtonsLoading}
            isDisabled={isError}
          />
        )}

        <AuthenticationPopupSummaryPage wasDataRestoredAndFull={!isDataLoading && isSummaryReady} />
      </>
    </NoSSR>
  );
};
