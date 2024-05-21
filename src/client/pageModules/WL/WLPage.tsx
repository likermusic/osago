import cn from 'classnames';
import React from 'react';

import { SHOULD_SHOW_PROBLEM_BANNER } from 'constants/FEATURE_FLAGS';

import { FlowType } from 'shared/config/FlowType';
import { useAppSelector } from 'shared/lib/redux';
import { sendEventRaffleBanner } from 'shared/lib/sendGAEvents';
import { usePrefetchNextPages } from 'shared/lib/usePrefetchNextPages';

import { LandingAdvantages } from 'entities/advantages';
import { LandingLogoCarousel } from 'entities/insuranceCompanies';
import {
  isQuestionnaireOnWLLandingSelector,
  isWhiteLabelFullFlowSelector,
  isWLOtpSelector,
} from 'entities/whiteLabels';

import { RaffleBanner } from 'features/RaffleBanner';

import { CarNumberBlock } from 'widgets/CalculationWidget/ui/CarNumberBlock';
import { SendNotificationBanner } from 'widgets/SendNotificationOfProblem';

import { WLLandingHeader, WLLandingQuestionnaire, WLLandingSteps, WLLandingWrapper, WLCustomTheme } from './ui';
import style from './WLPage.module.scss';
import { WLPageTexts } from './WLPage.texts';

export const WLPage: FC = () => {
  usePrefetchNextPages();
  const isFullWL = useAppSelector(isWhiteLabelFullFlowSelector);
  const isQuestionnaireOnWLLanding = useAppSelector(isQuestionnaireOnWLLandingSelector);

  const isWlOtp = useAppSelector(isWLOtpSelector);

  const OtpRaffleBanner = (
    <RaffleBanner
      config={WLPageTexts}
      variant="infoModal"
      onLinkClick={() => sendEventRaffleBanner({ place: 'WL', actionType: 'Подробнее' })}
    />
  );

  if (!isFullWL) {
    return (
      <>
        <WLCustomTheme />
        <WLLandingWrapper>
          <div className={cn(isWlOtp ? style.raffleHeaderShortWrapper : style.headerShortWrapper, style.shortWrapper)}>
            <WLLandingHeader />
          </div>

          {SHOULD_SHOW_PROBLEM_BANNER && (
            <div className={cn(style.carNumberShortWrapper, style.shortWrapper)}>
              <SendNotificationBanner />
            </div>
          )}

          {isWlOtp && <WLLandingWrapper className={style.raffleBannerWrapper}>{OtpRaffleBanner}</WLLandingWrapper>}

          <div className={isWlOtp ? style.carNumberWrapper : cn(style.carNumberShortWrapper, style.shortWrapper)}>
            <CarNumberBlock flowType={FlowType.Calculation} />
          </div>
        </WLLandingWrapper>
      </>
    );
  }

  return (
    <>
      <WLLandingWrapper className={!isWlOtp ? style.headerWrapper : ''}>
        <div className={cn(isWlOtp ? style.raffleHeaderShortWrapper : style.headerShortWrapper, style.shortWrapper)}>
          <WLLandingHeader />
        </div>
      </WLLandingWrapper>

      {SHOULD_SHOW_PROBLEM_BANNER && (
        <WLLandingWrapper className={style.carNumberWrapper}>
          <SendNotificationBanner />
        </WLLandingWrapper>
      )}

      {isWlOtp && <WLLandingWrapper className={style.raffleBannerWrapper}>{OtpRaffleBanner}</WLLandingWrapper>}

      <WLLandingWrapper className={style.carNumberWrapper}>
        <CarNumberBlock flowType={FlowType.Calculation} />
      </WLLandingWrapper>

      <LandingLogoCarousel className={style.carouselWrapper} />

      <WLLandingWrapper className={style.stepsWrapper}>
        <WLLandingSteps />
      </WLLandingWrapper>

      <div className={style.wrapperBottom}>
        <WLLandingWrapper>
          <LandingAdvantages
            showNoCommission
            isWL
          />
        </WLLandingWrapper>

        {isQuestionnaireOnWLLanding && (
          <WLLandingWrapper>
            <WLLandingQuestionnaire />
          </WLLandingWrapper>
        )}
      </div>
    </>
  );
};
