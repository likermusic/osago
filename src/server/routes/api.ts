import Router from '@koa/router';
import readSession from '@sravni/koa-utils/lib/middlewares/auth/readSession';
import { routeMetrics } from '@sravni/koa-utils/lib/middlewares/routeMetrics';
import { combineRouters } from '@sravni/koa-utils/lib/utils/routes';
import errorHandler from '@sravni/nextjs-utils/lib/middlewares/renderError';
import type { IDataProtector } from '@sravni/server-utils/dist/types/dataProtector';
import type { IOpenId } from '@sravni/server-utils/lib/openid';
import type { DefaultState, Middleware } from 'koa';

// Сервер не работает с алиасами
import { BFF_API_ROUTES } from '../../constants/apiRoutes';
import { getUTMCookies, requestAnalyticsEventPost } from '../controllers/api/analytics';
import { signinController, verifyController } from '../controllers/api/authorized';
import {
  getCarBrands,
  getCarDictionaries,
  getCarInfoController,
  getCarManufactureYears,
  getCarModels,
  getCarModificationController,
  getCarPowers,
  regNumberToken,
  regNumberTokenInfo,
} from '../controllers/api/auto';
import { clearCache } from '../controllers/api/clearCache';
import { getCrossCalculationsController, postCrossCalculationsController } from '../controllers/api/crossCalculations';
import { getCrossOrdersController, postCrossOrdersController } from '../controllers/api/crossOrders';
import { getAddresses, getHostings } from '../controllers/api/dadata';
import { disableUpSale } from '../controllers/api/disableUpSale';
import { getDriverKbm } from '../controllers/api/driver';
import { errorApiController } from '../controllers/api/error';
import { exampleApiController } from '../controllers/api/example';
import { getInviteLink } from '../controllers/api/getInviteLink';
import { getPoliciesDrafts } from '../controllers/api/getPoliciesDrafts';
import { getIndexedLocations, getRegionalCenters } from '../controllers/api/locations';
import { log } from '../controllers/api/log';
import { getMarketingInfo } from '../controllers/api/marketing';
import { getOrderInfo, postPolicyLink } from '../controllers/api/orderInfo';
import { getRecommendedStartDateController } from '../controllers/api/policyInfo';
import {
  getPreviousCalculationsController,
  getPreviousPoliciesController,
} from '../controllers/api/previousCalculationsAndPolicies';
import { postPeopleController } from '../controllers/api/profile';
import { findProlongationByCarNumber } from '../controllers/api/prolongation';
import { checkPromo } from '../controllers/api/promocode';
import {
  getCalculationsHash,
  getManyOrders,
  getPropositionCalculations,
  postManyOrders,
} from '../controllers/api/propositionCalculations';
import { restoreCalculationQuery } from '../controllers/api/query';
import { getPoliciesForRaffle, registerUserInRaffle } from '../controllers/api/raffle';
import { restoreSelectedPropositionInfo } from '../controllers/api/restoreSelectedPropositionInfo';
import { postAssignUserId, userInfo } from '../controllers/api/user';
import { decodeErrorsMiddleware } from '../middlewares/decodeErrorsMiddleware';
import setUser from '../middlewares/setUser';

interface IApiRouterOptions {
  openid: IOpenId;
  dataProtector: IDataProtector;
  prefix?: string;
}

// eslint-disable-next-line max-statements
export default function apiRoutes({ openid, prefix, dataProtector }: IApiRouterOptions): Middleware {
  const router = new Router<DefaultState, App.ExtendedContext>({
    prefix,
  });

  router.use(errorHandler);
  router.use(decodeErrorsMiddleware);

  router.use(readSession({ openid, dataProtector }));

  // GET
  router.get('/example', routeMetrics(), exampleApiController);
  router.get('/error', routeMetrics(), errorApiController);
  router.get(BFF_API_ROUTES.getBrands, routeMetrics(), getCarBrands);
  router.get(BFF_API_ROUTES.getModels, routeMetrics(), getCarModels);
  router.get(BFF_API_ROUTES.getCarInfoDictionaries, routeMetrics(), getCarDictionaries);
  router.get(BFF_API_ROUTES.getManufactureYears, routeMetrics(), getCarManufactureYears);
  router.get(BFF_API_ROUTES.getCarEnginePowers, routeMetrics(), getCarPowers);
  router.get(BFF_API_ROUTES.getCarModifications, routeMetrics(), getCarModificationController);
  router.get(BFF_API_ROUTES.getPreviousCalculations, routeMetrics(), getPreviousCalculationsController);
  router.get(BFF_API_ROUTES.getPropositionCalculations, routeMetrics(), getPropositionCalculations);
  router.get(BFF_API_ROUTES.getPolicies, routeMetrics(), getPreviousPoliciesController);
  router.get(BFF_API_ROUTES.getPurchasedPolicyInfo, routeMetrics(), getOrderInfo);
  router.get(BFF_API_ROUTES.getCrossCalculations, routeMetrics(), getCrossCalculationsController);
  router.get(BFF_API_ROUTES.account, setUser, routeMetrics(), userInfo);
  router.get(BFF_API_ROUTES.getCrossOrders, routeMetrics(), getCrossOrdersController);
  router.get(BFF_API_ROUTES.getPolicyLink, routeMetrics(), postPolicyLink);
  router.get(BFF_API_ROUTES.getRegNumberToken, routeMetrics(), regNumberToken);
  router.post(BFF_API_ROUTES.getRegNumberTokenInfo, routeMetrics(), regNumberTokenInfo);
  router.get(BFF_API_ROUTES.getRegionalCenters, routeMetrics(), getRegionalCenters);
  router.get(BFF_API_ROUTES.restoreCalculationQuery, routeMetrics(), restoreCalculationQuery);
  router.get(BFF_API_ROUTES.getUTMCookies, routeMetrics(), getUTMCookies);
  router.get(BFF_API_ROUTES.getManyOrders, routeMetrics(), getManyOrders);
  router.get(BFF_API_ROUTES.disableUpSale, routeMetrics(), disableUpSale);
  router.get(BFF_API_ROUTES.getMarketingInfo, routeMetrics(), getMarketingInfo);
  router.get(BFF_API_ROUTES.getDaDataHostings, routeMetrics(), getHostings);
  router.get(BFF_API_ROUTES.restoreSelectedPropositionInfo, routeMetrics(), restoreSelectedPropositionInfo);
  router.get(BFF_API_ROUTES.indexedRoutes, routeMetrics(), getIndexedLocations);
  router.get(BFF_API_ROUTES.getPoliciesForRaffle, routeMetrics(), getPoliciesForRaffle);

  // POST
  router.post(BFF_API_ROUTES.postCrossCalculations, routeMetrics(), postCrossCalculationsController);
  router.post(BFF_API_ROUTES.verify, routeMetrics(), verifyController);
  router.post(BFF_API_ROUTES.signin, routeMetrics(), signinController);
  router.post(BFF_API_ROUTES.postAssignUserId, routeMetrics(), postAssignUserId);
  router.post(BFF_API_ROUTES.postCrossOrders, routeMetrics(), postCrossOrdersController);
  router.post(BFF_API_ROUTES.postManyOrders, routeMetrics(), postManyOrders);
  router.post(BFF_API_ROUTES.postPeople, routeMetrics(), postPeopleController);
  router.post(BFF_API_ROUTES.getRecommendedStartDate, routeMetrics(), getRecommendedStartDateController);
  router.post(BFF_API_ROUTES.getAddressesAutocomplete, routeMetrics(), getAddresses);
  router.post(BFF_API_ROUTES.findProlongationByCarNumber, routeMetrics(), findProlongationByCarNumber);
  router.post(BFF_API_ROUTES.sendAnalyticsEvent, routeMetrics(), requestAnalyticsEventPost);
  router.post(BFF_API_ROUTES.log, log);
  router.post(BFF_API_ROUTES.getCalculationsHash, routeMetrics(), getCalculationsHash);
  router.post(BFF_API_ROUTES.checkPromo, routeMetrics(), checkPromo);
  router.post(BFF_API_ROUTES.getInviteLink, routeMetrics(), getInviteLink);
  router.post(BFF_API_ROUTES.clearCache, routeMetrics(), clearCache);
  router.post(BFF_API_ROUTES.getPoliciesDrafts, routeMetrics(), getPoliciesDrafts);
  router.post(BFF_API_ROUTES.getCarInfo, routeMetrics(), getCarInfoController);
  router.post(BFF_API_ROUTES.registerUserInRaffle, routeMetrics(), registerUserInRaffle);
  router.post(BFF_API_ROUTES.getDriverKbm, routeMetrics(), getDriverKbm);

  // @ts-ignore Не могу разобраться почему он ругается, пока закоментировал
  return combineRouters(router);
}
