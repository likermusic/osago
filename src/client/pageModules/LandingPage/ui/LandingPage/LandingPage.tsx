import type { VehicleType } from '@sravni/cosago-react-library/lib/types';
import { Space } from '@sravni/react-design-system';
import React, { useEffect } from 'react';

import { SHOULD_SHOW_PROBLEM_BANNER } from 'constants/FEATURE_FLAGS';

import { selectors } from 'shared/lib/qa';
import { useAppDispatch, useAppSelector } from 'shared/lib/redux';
import { useSendAnalytics } from 'shared/lib/sendAnalyticsEvents';
import { sendEventLanding, sendEventRaffleBanner } from 'shared/lib/sendGAEvents';
import { usePrefetchNextPages } from 'shared/lib/usePrefetchNextPages';

import { LandingAdvantages } from 'entities/advantages';
import { setCarInfoVehicleType } from 'entities/carInfo';
import { LandingExpertOpinion } from 'entities/expertOpinion';
import { LandingHowTo } from 'entities/howTo';
import { LandingCompaniesRating, LandingLogoCarousel } from 'entities/insuranceCompanies';
import { LandingFaq, SeoBreadcrumbs, SeoCoeffs, SeoLinksCloud } from 'entities/metadata';
import { OurApp } from 'entities/ourApp';
import { LandingReviews } from 'entities/reviews';
import { isUserLoggedInSelector } from 'entities/user';
import { WhatToDo } from 'entities/whatToDo';

import { RaffleBanner } from 'features/RaffleBanner';

import { CalculationWidget } from 'widgets/CalculationWidget';
import { LandingHeader } from 'widgets/Header';
import { SendNotificationBanner } from 'widgets/SendNotificationOfProblem';

import { LandingWrapper } from '../LandingWrapper/LandingWrapper';

import styles from './LandingPage.module.scss';
import { LandingPageTexts } from './LandingPage.texts';

export const LandingPage: FC<{ vehicleTypeUi: VehicleType }> = ({ vehicleTypeUi = 'car' }) => {
  useSendAnalytics('osago_landing');
  usePrefetchNextPages();

  const dispatch = useAppDispatch();

  const isUserLogged = useAppSelector(isUserLoggedInSelector);
  useEffect(() => {
    sendEventLanding(isUserLogged, vehicleTypeUi);
  }, [isUserLogged, vehicleTypeUi]);

  useEffect(() => {
    // если на анкете поменять тип и потом нажать назад, надо обратно принудительно пользователю поменять тип ТС на нужный
    dispatch(setCarInfoVehicleType(vehicleTypeUi));
  }, [dispatch, vehicleTypeUi]);

  return (
    <Space
      direction="vertical"
      className={styles.wrapper}
    >
      <LandingWrapper dataQa={selectors.landing.header}>
        <LandingHeader vehicleTypeUi={vehicleTypeUi} />
      </LandingWrapper>

      {SHOULD_SHOW_PROBLEM_BANNER && (
        <LandingWrapper className={styles.sendNotificationBannerWrapper}>
          <SendNotificationBanner />
        </LandingWrapper>
      )}

      <LandingWrapper className={styles.raffleBannerWrapper}>
        <RaffleBanner
          config={LandingPageTexts}
          onLinkClick={() => sendEventRaffleBanner({ place: 'Лендинг', actionType: 'Подробнее' })}
          shouldShowTimer
        />
      </LandingWrapper>

      <LandingWrapper dataQa={selectors.landing.steps}>
        <CalculationWidget vehicleTypeUi={vehicleTypeUi} />
      </LandingWrapper>

      <LandingWrapper dataQa={selectors.landing.steps}>
        <LandingHowTo vehicleTypeUi={vehicleTypeUi} />
      </LandingWrapper>

      <LandingLogoCarousel />

      <LandingWrapper dataQa={selectors.landing.guarantees}>
        <LandingAdvantages
          showNoCommission
          isWL={false}
        />
      </LandingWrapper>

      <LandingWrapper>
        <OurApp />
      </LandingWrapper>

      <div className={styles.whiteBackground}>
        <LandingWrapper>
          <WhatToDo />
          <LandingCompaniesRating />
        </LandingWrapper>
      </div>

      <LandingWrapper>
        <LandingReviews />
      </LandingWrapper>

      <LandingWrapper>
        <LandingExpertOpinion />
      </LandingWrapper>

      <LandingWrapper>
        <SeoCoeffs />
      </LandingWrapper>

      <LandingWrapper>
        <LandingFaq />
      </LandingWrapper>

      <SeoLinksCloud />

      <LandingWrapper>
        <SeoBreadcrumbs />
      </LandingWrapper>
    </Space>
  );
};
