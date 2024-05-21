import { COOKIE_NAMES } from 'constants/cookiesNames';

export const readClientIdFromCookie = (getCookie: (cookieName: string) => string | undefined) =>
  getCookie(COOKIE_NAMES.googleAnalytics)?.slice(6);

export const readYandexClientIdFromCookieOrScript = (
  getCookie: (cookieName: string) => string | undefined,
  isWl: boolean,
) =>
  getCookie(COOKIE_NAMES.yandexAnalytics) ||
  (isWl ? window?.yaCounter87750877?.getClientID() : window?.yaCounter159737?.getClientID());
