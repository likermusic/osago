import { parsePartnerCookie } from '@sravni/utils/lib/analytics';

import { COOKIE_NAMES } from '../../../constants/cookiesNames';

import type { OsagoPartnerQuery } from './types';

const normalizeValue = (value?: string) => parseInt(value || '', 10) || undefined;

export const readPartnerCookie = (getCookie: (cookieName: string) => string | undefined): OsagoPartnerQuery => {
  const partner = parsePartnerCookie(getCookie(COOKIE_NAMES.partner) ?? '');

  return {
    affId: normalizeValue(partner.aff_id),
    affSub1: partner.aff_sub,
    affSub2: partner.aff_sub2,
    affSub3: partner.aff_sub3,
    affSub4: partner.aff_sub4,
    affSub5: partner.aff_sub5,
    campaign: partner.uc,
    medium: partner.um,
    offerId: normalizeValue(partner.p_offer_id),
    source: partner.us,
    sourceId: partner.source,
    subId: partner.sid,
    transactionId: partner.tid,
  };
};