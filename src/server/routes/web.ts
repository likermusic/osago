import Router from '@koa/router';
import readCrossDomainsActions from '@sravni/koa-utils/lib/middlewares/auth/readCrossDomainsActions';
import readSession from '@sravni/koa-utils/lib/middlewares/auth/readSession';
import validateCrossDomainsActions from '@sravni/koa-utils/lib/middlewares/auth/validateCrossDomainsActions';
import validateSession from '@sravni/koa-utils/lib/middlewares/auth/validateSession';
import device from '@sravni/koa-utils/lib/middlewares/device';
import readTheme from '@sravni/koa-utils/lib/middlewares/readTheme';
import { routeMetrics } from '@sravni/koa-utils/lib/middlewares/routeMetrics';
import selectedLocation from '@sravni/koa-utils/lib/middlewares/selectedLocation';
import { combineRouters } from '@sravni/koa-utils/lib/utils/routes';
import errorHandler from '@sravni/nextjs-utils/lib/middlewares/renderError';
import type { IDataProtector } from '@sravni/server-utils/lib/dataProtector';
import type { IOpenId } from '@sravni/server-utils/lib/openid';
import type { DefaultState, Middleware } from 'koa';

import {
  ANKETA_ROUTE,
  CANARY_ROUTE,
  ERROR_ROUTE,
  FAILURE_ROUTE,
  MAIN_ROUTE,
  MOTORCYCLE_LANDING_ROUTE,
  ORDER_ROUTE,
  PROPOSITIONS_ROUTE,
  SEO_MATCHER,
  SUCCESS_ROUTE,
  SUMMARY_ROUTE,
  TRIGGER_COMMUNICATION_LOADER_ROUTE,
  WIN3CARS_ROUTE,
  WL_ROUTE,
} from '../../constants/routes';
import { DEFAULT_REGION } from '../constants/locations';
import { anketaController } from '../controllers/pages/anketa';
import { canaryController } from '../controllers/pages/canary';
import { errorPageController } from '../controllers/pages/error';
import { failureController } from '../controllers/pages/failure';
import { mainLandingPageController } from '../controllers/pages/landings/mainLanding';
import { motorcycleLandingPageController } from '../controllers/pages/landings/motorcycleLanding';
import { seoLandingPageController } from '../controllers/pages/landings/seo';
import { win3carsController } from '../controllers/pages/landings/win3cars';
import { wlController } from '../controllers/pages/landings/wl';
import { triggerCommunicationLoaderController } from '../controllers/pages/loader';
import { orderController } from '../controllers/pages/order';
import { propositionsController } from '../controllers/pages/propositions';
import { successController } from '../controllers/pages/success';
import { summaryController } from '../controllers/pages/summary';
import { appConfigMiddleware } from '../middlewares/appConfigMiddleware';
import { loadAbTestingSdkMiddleware } from '../middlewares/loadAbTestingSdkMiddleware';
import { loadInsuranceCompanies } from '../middlewares/loadInsuranceCompanies';
import { loadInsuranceCompaniesRatings } from '../middlewares/loadInsuranceCompaniesRatings';
import { setOtpHeaderFormData } from '../middlewares/OtpWl/setOtpHeaderFormData';
import { restoreRedirectForTriggerCommunication } from '../middlewares/restoreRedirectForTriggerCommunication';
import { restoreRedirectToAnketaPage } from '../middlewares/restoreRedirectToAnketaPage';
import { restoreRedirectToPropositionPage } from '../middlewares/restoreRedirectToPropositionPage';
import { restoreRedirectToSummaryPage } from '../middlewares/restoreRedirectToSummaryPage';
import setDeviceInfo from '../middlewares/setDeviceInfo';
import { setLandingPagesSeoData } from '../middlewares/setLandingPagesSeoData';
import { setPromosMiddleware } from '../middlewares/setPromosMiddleware';
import { setRegionByRoute } from '../middlewares/setRegionByRoute';
import setSelectedLocation from '../middlewares/setSelectedLocation';
import setTheme from '../middlewares/setTheme';
import setUser from '../middlewares/setUser';
import { setUserInvitation } from '../middlewares/setUserInvitation';
import setUtmDateCookies from '../middlewares/setUtmDateCookies';
import { setWLMiddleware } from '../middlewares/setWl';
import { findLocationByRouteId } from '../services/locations';

export interface IWebRouterOptions {
  openid: IOpenId;
  dataProtector: IDataProtector;
}

// eslint-disable-next-line max-statements
export default function webRoutes(options: IWebRouterOptions): Middleware {
  const { openid, dataProtector } = options;
  const router = new Router<DefaultState, App.ExtendedContext>();

  router.use(errorHandler);
  router.use(loadAbTestingSdkMiddleware);
  router.use(readTheme);
  router.use(readSession({ openid, dataProtector }));
  router.use(readCrossDomainsActions());
  router.use(validateCrossDomainsActions());
  router.use(validateSession({ openid, dataProtector }));
  router.use(device);
  router.use(
    selectedLocation({
      defaultLocationRoute: DEFAULT_REGION.route,
      getLocationByRoute: async (route) => findLocationByRouteId({ route }),
    }),
  );
  router.use(setUser);
  router.use(appConfigMiddleware);
  router.use(setWLMiddleware);
  router.use(setDeviceInfo);
  router.use(setTheme);
  router.use(setSelectedLocation);
  router.use(setPromosMiddleware);
  router.use(loadInsuranceCompanies);
  router.use(setUtmDateCookies);
  router.use(setUserInvitation);

  router.get(
    MOTORCYCLE_LANDING_ROUTE,
    routeMetrics(),
    loadInsuranceCompaniesRatings,
    setLandingPagesSeoData,
    motorcycleLandingPageController,
  );

  router.get(
    MAIN_ROUTE,
    routeMetrics(),
    restoreRedirectForTriggerCommunication,
    restoreRedirectToPropositionPage,
    restoreRedirectToSummaryPage,
    loadInsuranceCompaniesRatings,
    restoreRedirectToAnketaPage,
    setLandingPagesSeoData,
    mainLandingPageController,
  );

  router.get(ANKETA_ROUTE, routeMetrics(), anketaController);
  router.get(SUCCESS_ROUTE, routeMetrics(), successController);
  router.get(FAILURE_ROUTE, routeMetrics(), failureController);
  router.get(ERROR_ROUTE, routeMetrics(), errorPageController);
  router.get(PROPOSITIONS_ROUTE, routeMetrics(), propositionsController);
  router.get(SUMMARY_ROUTE, routeMetrics(), summaryController);
  router.get(ORDER_ROUTE, routeMetrics(), orderController);
  router.get(CANARY_ROUTE, routeMetrics(), canaryController);
  router.get(TRIGGER_COMMUNICATION_LOADER_ROUTE, routeMetrics(), triggerCommunicationLoaderController);
  router.get(WIN3CARS_ROUTE, routeMetrics(), win3carsController);
  router.get(WL_ROUTE, routeMetrics(), setOtpHeaderFormData, wlController);

  // pages
  router.get(
    SEO_MATCHER.urls,
    setRegionByRoute,
    loadInsuranceCompaniesRatings,
    routeMetrics(),
    seoLandingPageController,
  );

  // @ts-ignore Не могу разобраться почему он ругается, пока закоментировал
  return combineRouters(router);
}
