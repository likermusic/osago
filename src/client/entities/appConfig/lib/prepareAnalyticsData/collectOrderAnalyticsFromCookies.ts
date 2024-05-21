import { COOKIE_NAMES } from 'constants/cookiesNames';

import type { Base } from '../../types';

import { readPartnerCookie } from './readPartnerCookie';
import { readPromotionCookie } from './readPromotionCookie';
import { readUTMCookie } from './readUTMCookie';

export const collectOrderAnalyticsFromCookies = (getCookie: (cookieName: string) => string | undefined): Base => ({
  partner: readPartnerCookie(getCookie(COOKIE_NAMES.partner), getCookie(COOKIE_NAMES.partnerSetDate)),
  promotionQuery: readPromotionCookie(getCookie(COOKIE_NAMES.promotion)),
  utm: readUTMCookie(getCookie(COOKIE_NAMES.utm), getCookie(COOKIE_NAMES.utmSetDate)),
  clid: getCookie(COOKIE_NAMES.clid),
});
