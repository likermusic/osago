import type { IAbTestingInfo } from '@sravni/ab-testing-sdk/lib/node';
import type { ThemeNames } from '@sravni/design-system-theme';
import { ThemeName } from '@sravni/design-system-theme';
import type { IDeviceInfo } from '@sravni/koa-utils/lib/middlewares/device';
import { Notifications } from '@sravni/react-design-system';
import { AbTestingProvider, ConfigProvider, DeviceInfoProvider, ThemeProvider } from '@sravni/react-utils';
import type { NextComponentType } from 'next';
import getConfig from 'next/config';
import React from 'react';

import { CustomCommonHead } from 'shared/ui/CustomCommonHead';
import { ErrorBoundaryWithFallback } from 'shared/ui/ErrorBoundaryFallback/ErrorBoundaryWithFallback';

import { analyticsGTMSelector, setABStatistics, setAppConfig } from 'entities/appConfig';
import { setShouldShowUserAgreement } from 'entities/authSms';
import { setCarInfoVehicleType } from 'entities/carInfo';
import { HintNotification } from 'entities/hintNotification';
import { insuranceCompaniesSlice } from 'entities/insuranceCompanies';
import { invitationSlice } from 'entities/invitation';
import { fetchRegions as fetchRegionsRequest, locationSlice } from 'entities/locations';
import { metadataSlice, Seo } from 'entities/metadata';
import { setPromocode } from 'entities/propositionCalculations';
import { setShouldResetAnketa } from 'entities/restoredQuery';
import { reviewsSlice } from 'entities/reviews';
import { siteSettingsSlice } from 'entities/siteSettings';
import { userSlice } from 'entities/user';
import { whiteLabelSlice } from 'entities/whiteLabels';

import { updateFormStoreThunk } from 'features/RestoreQueryFromUrl';

import { SendAnalyticsProvider } from 'widgets/sendAnalyticsWidget';
import { SiteFlowWrapper } from 'widgets/SiteFlowWrapper';

import type { GlobalState } from 'app/MyApp';
import { getOrCreateStore, StoreProvider, usePersistedStore, useSetCookiesOnMount } from 'app/MyApp';
import type { AppInitialProps, AppProps } from 'next/app';

import { PageWrapper } from '../PageWrapper/PageWrapper';

import styles from './MyApp.module.scss';

// eslint-disable-next-line import/no-unassigned-import
import '@sravni/design-system-theme/lib/globalStyles.css';

const runtimeConfig = {
  gatewayUrl: getConfig().publicRuntimeConfig.gatewayUrl,
  publicUrl: getConfig().publicRuntimeConfig.publicUrl,
  environment: getConfig().publicRuntimeConfig.environment,
};

interface IProps extends AppProps {
  realPath: string;
  initialReduxState: GlobalState;
  deviceInfo: IDeviceInfo;
  theme: ThemeNames;
  abTestingInfo?: IAbTestingInfo;
  // TODO: OS-6732 выпилить any
  Component: FC<any>;
}

// FIXME: инициализирующую логику внутри слоя
export const MyApp: NextComponentType<App.ReduxAppContext, AppInitialProps, IProps> = (props) => {
  const { setLocations } = locationSlice.actions;
  const { Component, pageProps, initialReduxState, deviceInfo, theme, abTestingInfo } = props;
  const reduxStore = usePersistedStore(initialReduxState);
  const { getState, dispatch } = reduxStore;
  const { user } = getState();
  const googleTmId = analyticsGTMSelector(getState());

  const userId = user?.isLoggedIn ? user.account?.sub : undefined;
  const { publicRuntimeConfig } = getConfig();

  const isProduction = publicRuntimeConfig.environment === 'production';
  const isStage = publicRuntimeConfig.environment === 'stage';

  useSetCookiesOnMount(reduxStore);

  const fetchRegions = React.useCallback(async () => {
    const centers = await fetchRegionsRequest();

    dispatch(setLocations(centers));
  }, [dispatch, setLocations]);

  React.useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { queue } = require('shared/lib/queue');
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const Sentry = require('@sentry/nextjs');

    if (isProduction || isStage) {
      queue.push(() => {
        Sentry.init({
          dsn: publicRuntimeConfig.sentryDSN,
          environment: publicRuntimeConfig.environment,
          ignoreErrors: [
            `Failed to execute 'evaluate' on 'Document': The string '' is not a valid XPath expression.`,
            'timeout of 15000ms exceeded',
            'Network Error',
            'Request aborted',
            'Request failed with status code 502',
            'Request failed with status code 400',
            'Request failed with status code 500',
            `Failed to execute 'sendBeacon' on 'Navigator': sendBeacon() with a Blob whose type is not any of the CORS-safelisted values for the Content-Type request header is disabled temporarily. See http://crbug.com/490015 for details.`,
          ],
        });
      });

      queue.push(() => {
        if ('serviceWorker' in navigator) {
          navigator.serviceWorker.register('/service-worker.js').catch((err) => {
            console.warn('service worker registration failed', err.message); // eslint-disable-line no-console
          });
        }
      });
    }

    queue.push(() => fetchRegions());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ErrorBoundaryWithFallback>
      <StoreProvider store={reduxStore}>
        <AbTestingProvider initialValue={abTestingInfo}>
          <DeviceInfoProvider initialInfo={deviceInfo}>
            <ThemeProvider initialTheme={theme}>
              <ConfigProvider value={runtimeConfig}>
                <SendAnalyticsProvider>
                  <CustomCommonHead
                    googleTmId={googleTmId}
                    userId={userId}
                    isProduction={isProduction}
                    withWebVisor
                  />
                  <Seo />

                  <PageWrapper>
                    <ErrorBoundaryWithFallback>
                      <div className={styles.wrapper}>
                        <SiteFlowWrapper dataThemeName={theme}>
                          <Component {...pageProps} />
                        </SiteFlowWrapper>

                        {/* дает возможность выводить уведомления пользователю нна всех страницах */}
                        <HintNotification />
                        <Notifications />
                      </div>
                    </ErrorBoundaryWithFallback>
                  </PageWrapper>
                </SendAnalyticsProvider>
              </ConfigProvider>
            </ThemeProvider>
          </DeviceInfoProvider>
        </AbTestingProvider>
      </StoreProvider>
    </ErrorBoundaryWithFallback>
  );
};

// eslint-disable-next-line max-statements
MyApp.getInitialProps = async ({ Component, ctx }: App.ReduxAppContext) => {
  const { saveInsuranceCompaniesFullMap, saveInsuranceCompaniesIdList, saveInsuranceCompaniesRatings } =
    insuranceCompaniesSlice.actions;

  const reduxStore = getOrCreateStore();
  const isServer = typeof ctx.req !== 'undefined';
  ctx.store = reduxStore;

  const otherProps = {
    deviceInfo: { phone: false, tablet: false, isAppleMobile: false },
    theme: ThemeName.lager,
    abTestingInfo: undefined,
  };

  if (isServer && ctx.req) {
    if (ctx.req.__SITE_SETTINGS__) {
      reduxStore.dispatch(siteSettingsSlice.actions.setSettings(ctx.req.__SITE_SETTINGS__));
    }
    if (ctx.req.__SELECTED_LOCATION__) {
      reduxStore.dispatch(locationSlice.actions.setCurrentLocation(ctx.req.__SELECTED_LOCATION__));
    }

    if (ctx.req.__WL__) {
      reduxStore.dispatch(
        whiteLabelSlice.actions.setWhiteLabel({
          wl: ctx.req.__WL__.analytics,
          nonPartnerWl: ctx.req.__WL__.nonPartnerWl,
        }),
      );
    } else {
      if (ctx.req.__SEO__) {
        reduxStore.dispatch(metadataSlice.actions.setMetadata(ctx.req.__SEO__));
      }

      if (ctx.req.__USER__) {
        const user = ctx.req.__USER__;
        reduxStore.dispatch(userSlice.actions.setUser(user));
      }
    }

    if (ctx.req.__REVIEWS__) {
      reduxStore.dispatch(reviewsSlice.actions.setReviews(ctx.req.__REVIEWS__));
    }

    if (ctx.req.__LANDING_FRIEND__) {
      reduxStore.dispatch(invitationSlice.actions.setInvitation(ctx.req.__LANDING_FRIEND__));
    }

    if (ctx.req.__INSURANCE_COMPANIES__) {
      reduxStore.dispatch(saveInsuranceCompaniesFullMap(ctx.req.__INSURANCE_COMPANIES__.companies));
      reduxStore.dispatch(saveInsuranceCompaniesIdList(ctx.req.__INSURANCE_COMPANIES__.idList));
    }

    if (ctx.req.__INSURANCE_COMPANIES_ALL_RATINGS__) {
      reduxStore.dispatch(saveInsuranceCompaniesRatings(ctx.req.__INSURANCE_COMPANIES_ALL_RATINGS__));
    }

    if (ctx.req.__DEVICE_INFO__) {
      otherProps.deviceInfo = ctx.req.__DEVICE_INFO__;
    }

    if (ctx.req.__THEME__) {
      otherProps.theme = ctx.req.__THEME__;
    }

    if (ctx.req.__APP_CONFIG__) {
      reduxStore.dispatch(setAppConfig(ctx.req.__APP_CONFIG__));
    }

    if (ctx.req.__AB_TESTING__) {
      otherProps.abTestingInfo = ctx.req.__AB_TESTING__?.abTestingInfo;
      reduxStore.dispatch(setABStatistics(ctx.req.__AB_TESTING__.analyticsStatistics));
    }

    if (ctx.req.__BENEFIT_CODE__) {
      reduxStore.dispatch(setPromocode(ctx.req.__BENEFIT_CODE__));
    }

    if (ctx.req.__FORM_OTP_DATA__) {
      reduxStore.dispatch(setShouldResetAnketa(false));

      reduxStore.dispatch(updateFormStoreThunk(ctx.req.__FORM_OTP_DATA__));
    }

    if (ctx.req.__VEHICLE_TYPE__) {
      reduxStore.dispatch(setCarInfoVehicleType(ctx.req.__VEHICLE_TYPE__));
    }

    if (ctx.query.shouldshowuseragreement) {
      reduxStore.dispatch(setShouldShowUserAgreement(ctx.query.shouldshowuseragreement === 'true'));
    }
  }

  const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

  return {
    initialReduxState: reduxStore.getState(),
    realPath: ctx.req?.url || '',
    pageProps,
    ...otherProps,
  };
};

// export function reportWebVitals(metric: NextWebVitalsMetric) {
//   console.log(metric)
// }
