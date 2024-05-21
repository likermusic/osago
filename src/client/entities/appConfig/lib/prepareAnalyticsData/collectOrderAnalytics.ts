import type { AxiosResponse } from 'axios';

import type { Cookies } from 'commonTypes/api/cookies';
import { BFF_PROXY_API } from 'constants/apiRoutes';
import { COOKIE_NAMES } from 'constants/cookiesNames';

import { axiosWithoutRetries } from 'shared/api/requestInstance';
import { sendSentryClientErrorOnce } from 'shared/lib/sendSentryClientError';

import { COOKIE_DEFAULT_VALUE } from '../../constants';
import type { Base } from '../../types';

import { collectOrderAnalyticsFromCookies } from './collectOrderAnalyticsFromCookies';
import { readUTMCookie } from './readUTMCookie';
import { readClientIdFromCookie, readYandexClientIdFromCookieOrScript } from './readUtmId';
import { sendUtmNotFound } from './sendUtmNotFound';

export const collectOrderAnalytics = async (
  getCookie: (cookieName: string) => string | undefined,
  originalUrl: string,
  isWl: boolean,
  logAnalytics = false,
): Promise<Base> => {
  const { clid, partner, promotionQuery, utm } = collectOrderAnalyticsFromCookies(getCookie);
  let currentUtm = utm;

  const utmSource = currentUtm?.source;

  if (!utmSource || utmSource === COOKIE_DEFAULT_VALUE) {
    if (logAnalytics) {
      sendUtmNotFound(originalUrl, 'ANALYTIC_UTM_NOT_FOUND');
    }

    try {
      const { data } = await axiosWithoutRetries.get<
        Cookies.TUTMCookiesRequest,
        AxiosResponse<Cookies.TUTMCookiesResponse>
      >(BFF_PROXY_API.getUTMCookies, {
        params: {
          url: originalUrl,
        },
      });

      const utmCookiesString = data.cookies?.find((cookie) => cookie.name === COOKIE_NAMES.utm)?.value || '';

      if (utmCookiesString) {
        currentUtm = readUTMCookie(utmCookiesString);
      }

      if (logAnalytics && (!currentUtm?.source || currentUtm.source === COOKIE_DEFAULT_VALUE)) {
        sendUtmNotFound(originalUrl, 'ANALYTIC_UTM_NOT_FOUND_AFTER_COOKIE_REQUEST');
      }
    } catch (e) {
      sendSentryClientErrorOnce('ANALYTIC_ERROR', e, { clid, partner, promotionQuery, currentUtm });

      if (logAnalytics) {
        sendUtmNotFound(originalUrl, 'ANALYTIC_UTM_NOT_FOUND_COOKIE_REQUEST_ERROR');
      }
    }
  }

  currentUtm.uaClientId = readClientIdFromCookie(getCookie);
  currentUtm.ymClientId = readYandexClientIdFromCookieOrScript(getCookie, isWl);

  if (logAnalytics) {
    if (!currentUtm.uaClientId) {
      sendUtmNotFound(originalUrl, 'ANALYTIC_UA_CLIENT_ID_NOT_FOUND');
    }

    if (!currentUtm.ymClientId) {
      sendUtmNotFound(originalUrl, 'ANALYTIC_YM_CLIENT_ID_NOT_FOUND');
    }
  }

  return { clid, partner, promotionQuery, utm: currentUtm };
};
