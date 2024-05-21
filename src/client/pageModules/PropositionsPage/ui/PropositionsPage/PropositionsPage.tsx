import type { NextPage } from 'next';
import { useCallback, useState } from 'react';

import { SHOULD_SHOW_PROBLEM_BANNER } from 'constants/FEATURE_FLAGS';

import { redirectToLandingWithReplaceAndClearQueryParams } from 'shared/config/router';
import { useAppDispatch, useAppSelector } from 'shared/lib/redux';
import { sendEventSummaryDataVisibility } from 'shared/lib/sendGAEvents';
import { usePropositionPageScroll } from 'shared/lib/usePageScroll';
import { usePrefetchNextPages } from 'shared/lib/usePrefetchNextPages';
import { NoSSR } from 'shared/ui';
import { ScrollOnMountAnchor } from 'shared/ui/ScrollOnMountAnchor/';

import { HowToOrder } from 'entities/HowToOrder';
import { DEFAULT_MARKETING_INFO, Reviews, useGetMarketingInfo } from 'entities/MarketingInfo';
import { useLazyGetPolicyInfoFromQuery } from 'entities/PolicyInfo';
import {
  propositionStatusSelector,
  useNewCalculation,
  useSendCalculationAnalytics,
} from 'entities/propositionCalculations';
import { RaffleCountdownTimer } from 'entities/RaffleCountdownTimer';
import { isWLSelector } from 'entities/whiteLabels';

import { collectCalculationQuery } from 'features/CollectQuery';
import { Promocode } from 'features/Promocode';
import { useRestoreCalculation } from 'features/RestoreQueryFromUrl';
import { PolicyStartDate } from 'features/UpdatePolicyStartDate';

import { formReadyForSendingSelector, runAfterCheckFormReadyThunk, UserDataSummary } from 'widgets/AnketaWidget';
import { KbmDiscount } from 'widgets/KbmDiscount';
import { Proposition } from 'widgets/Propositions';
import { SendNotificationBanner } from 'widgets/SendNotificationOfProblem';

import styles from './PropositionsPage.module.scss';

type TPropositionsPage = {
  calculationHash: string;
};

export const PropositionsPage: NextPage<TPropositionsPage> = () => {
  const isSummaryReady = useAppSelector(formReadyForSendingSelector);
  const isWL = useAppSelector(isWLSelector);
  const dispatch = useAppDispatch();
  const { getPolicyInfo } = useLazyGetPolicyInfoFromQuery();
  usePrefetchNextPages();
  const requestCalculationHash = useNewCalculation(collectCalculationQuery);

  const { isLoading: isRestoreCalculationLoading } = useRestoreCalculation({
    successCallback: (response) => {
      dispatch(
        runAfterCheckFormReadyThunk((isReady) => {
          if (isReady) {
            getPolicyInfo(response);
            requestCalculationHash(true);
          }
        }),
      );
    },
    errorCallback: redirectToLandingWithReplaceAndClearQueryParams,
    shouldUseStoreFirst: isSummaryReady,
  });

  useSendCalculationAnalytics();

  const propositionCalculationStatus = useAppSelector(propositionStatusSelector);

  const { data: marketingInfo = DEFAULT_MARKETING_INFO } = useGetMarketingInfo();

  const [isAnketaOpened, setIsAnketaOpened] = useState(true);
  const { anketaId, navigateToAnketa, navigateToPropositionList, propositionId } = usePropositionPageScroll();

  const handleRunCalculation = async () => {
    const isCalculationStarted = await requestCalculationHash();
    if (isCalculationStarted) {
      navigateToPropositionList();
    }
  };

  const toggleIsOpened = useCallback((val: boolean) => {
    setIsAnketaOpened(val);
  }, []);

  return (
    <>
      <RaffleCountdownTimer isWL={isWL} />
      <div className={styles.pageWrapper}>
        <div className={styles.infoWrapper}>
          <div className={styles.anketa}>
            <NoSSR>
              <UserDataSummary
                scrollId={anketaId}
                onDataChanged={handleRunCalculation}
                isLoading={isRestoreCalculationLoading}
                isOpened={isAnketaOpened}
                toggleIsOpened={toggleIsOpened}
              />
            </NoSSR>
          </div>

          <ScrollOnMountAnchor>
            <PolicyStartDate
              onDataChanged={handleRunCalculation}
              className={styles.policyStartDateCard}
              isRestoreCalculationLoading={isRestoreCalculationLoading}
            />
          </ScrollOnMountAnchor>

          <KbmDiscount onDataChanged={handleRunCalculation} />

          <Promocode
            className={styles.promocode}
            onDataChanged={handleRunCalculation}
          />
        </div>

        <div
          id={propositionId}
          className={styles.propositions}
        >
          {SHOULD_SHOW_PROBLEM_BANNER && (
            <div className={styles.sendBanner}>
              <SendNotificationBanner />
            </div>
          )}
          <Proposition
            // TODO: https://sravni-corp.atlassian.net/browse/OS-7437 проверить на нужность banners
            banners={marketingInfo?.banners}
            onCheckDataBtnClick={() => {
              navigateToAnketa();
              if (!isAnketaOpened) {
                sendEventSummaryDataVisibility('Показать (авто)');
              }
            }}
          />
        </div>

        {propositionCalculationStatus !== 'error' && propositionCalculationStatus !== 'empty' && !isWL && (
          <HowToOrder className={styles.howToOrder} />
        )}

        {!!marketingInfo.reviews?.length && !isWL && (
          <Reviews
            className={styles.reviews}
            reviews={marketingInfo.reviews}
          />
        )}
      </div>
    </>
  );
};
