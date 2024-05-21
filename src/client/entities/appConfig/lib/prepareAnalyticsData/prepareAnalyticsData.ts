import Cookies from 'js-cookie';

import type { TAnalytics, OsagoPartnerQuery, PreparedAnalytics } from '../../types';

import { collectOrderAnalytics } from './collectOrderAnalytics';
import { readClientIdFromCookie, readYandexClientIdFromCookieOrScript } from './readUtmId';
import { sendUtmNotFound } from './sendUtmNotFound';

type TPrepareAnalyticsData = {
  logAnalytics?: boolean;
  isWL: boolean;
  isNonPartnerWl: boolean;
  base?: TAnalytics['base'];
  wl: OsagoPartnerQuery;
  originalUrl: string;
};
const getCookie = Cookies.get;

export const prepareAnalyticsData = async ({
  logAnalytics = false,
  isWL,
  isNonPartnerWl,
  base,
  wl,
  originalUrl,
}: TPrepareAnalyticsData): Promise<PreparedAnalytics> => {
  if (isWL && !isNonPartnerWl) {
    return { partner: wl };
  }

  if (base?.utm) {
    if (logAnalytics) {
      if (!base.utm.uaClientId) {
        sendUtmNotFound(originalUrl, 'ANALYTIC_UA_CLIENT_ID_NOT_FOUND_IN_BASE');
      }

      if (!base.utm.ymClientId) {
        sendUtmNotFound(originalUrl, 'ANALYTIC_YM_CLIENT_ID_NOT_FOUND_IN_BASE');
      }
    }

    if (!base.utm.uaClientId) {
      return {
        ...base,
        utm: {
          ...base.utm,
          uaClientId: readClientIdFromCookie(getCookie),
        },
      };
    }

    if (!base.utm.ymClientId) {
      return {
        ...base,
        utm: {
          ...base.utm,
          ymClientId: readYandexClientIdFromCookieOrScript(getCookie, isWL),
        },
      };
    }

    return base;
  }
  //  сюда попасть не должны так хук хук src/client/app/MyApp/lib/useMount.ts инициализирует utm всегда со значением true
  return collectOrderAnalytics(getCookie, originalUrl, isWL, logAnalytics);
};
