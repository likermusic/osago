import { SRAVNI_AUTH_FRONTEND_SCOPE } from '@sravni/server-utils/lib/consts';
import OpenId from '@sravni/server-utils/lib/openid';

import { config } from '../constants/config';

export const identityOpenid = new OpenId({
  clientId: config.CLIENT_ID,
  clientSecret: config.CLIENT_SECRET,
  clientScope: SRAVNI_AUTH_FRONTEND_SCOPE,
  issuerUrl: config.ISSUER,
  webPath: config.WEB_PATH,
});

const SCOPES_SERVICES = [
  config.AUTO_SERVICE_CAR_INFO_SCOPE,
  config.AUTO_SERVICE_PARSER_INFO_SCOPE,
  config.OSAGO_SERVICE_DC_INFO_SCOPE,
  config.OSAGOGATEWAY_SERVICE_SCOPE,
];
export const servicesOpenid = new OpenId({
  // Развесы на clientId для локальной разработки, чтоб не хранить секреты в проекте
  clientId: config.CLIENT_ID_BFF || config.CLIENT_ID,
  clientSecret: config.CLIENT_SECRET_BFF || config.CLIENT_SECRET,
  clientScope: SCOPES_SERVICES.join(' '),
  issuerUrl: config.ISSUER,
  webPath: config.WEB_PATH,
});

/**
 * Токен для межсервисной авторизации
 */
export const getServicesAuthHeader = async (serviceName: string) => servicesOpenid.getIssuerCredentials(serviceName);

export const getUserAuthHeader = async () => identityOpenid.getIssuerCredentials();
