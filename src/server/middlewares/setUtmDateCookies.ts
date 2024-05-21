import { differenceInDays, isValid } from 'date-fns';
import type { Next } from 'koa';

import { COOKIE_NAMES } from '../../constants/cookiesNames';

export default function setUtmDateCookies(ctx: App.ExtendedContext, next: Next): Promise<void> {
  const currentDate = new Date();
  const currentDateISO = currentDate.toISOString();

  const utmz = ctx.cookies.get(COOKIE_NAMES.utm);
  const previousUtmz = ctx.cookies.get(COOKIE_NAMES.previousUtm);
  const utmzDateISO = ctx.cookies.get(COOKIE_NAMES.utmSetDate);
  const utmzSetDate = new Date(utmzDateISO);

  if (utmz) {
    if (
      !utmzDateISO ||
      (utmzDateISO && isValid(utmzSetDate) && differenceInDays(currentDate, utmzSetDate) > 30 && utmz !== previousUtmz)
    )
      ctx.cookies.set(COOKIE_NAMES.utmSetDate, currentDateISO, { httpOnly: false });

    if (!previousUtmz || utmz !== previousUtmz) ctx.cookies.set(COOKIE_NAMES.previousUtm, utmz, { httpOnly: false });
  }

  const partner = ctx.cookies.get(COOKIE_NAMES.partner);
  const previousPartner = ctx.cookies.get(COOKIE_NAMES.previousPartner);
  const partnerDateISO = ctx.cookies.get(COOKIE_NAMES.partnerSetDate);

  if (partner) {
    if (!partnerDateISO || partner !== previousPartner)
      ctx.cookies.set(COOKIE_NAMES.partnerSetDate, currentDateISO, { httpOnly: false });

    if (!previousPartner || partner !== previousPartner)
      ctx.cookies.set(COOKIE_NAMES.previousPartner, partner, { httpOnly: false });
  }

  return next();
}
