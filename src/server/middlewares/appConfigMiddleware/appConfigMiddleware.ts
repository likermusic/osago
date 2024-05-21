import dayjs from 'dayjs';
import type { Next } from 'koa';

import { WL_QUERY_PARAMS } from '../../../constants';
import { getParentId } from '../utils/getParentId';

import { getAppType } from './getAppType';
import { getGtmKey } from './getGtmKey';
import { shouldOpenPaymentLinkInCurrentTab } from './shouldOpenPaymentLinkInCurrentTab';

export const appConfigMiddleware = async (ctx: App.ExtendedContext, next: Next) => {
  const query = ctx.query || {};

  const parentId = await getParentId(ctx);

  const appType = getAppType(ctx.path, parentId);

  if (ctx.path.startsWith('/osago/mir')) {
    const expiresDate = dayjs().add(14, 'day').toDate();

    ctx.cookies.set('benefit_code', 'mir', { expires: expiresDate });
  }

  ctx.req.__APP_CONFIG__ = {
    appType,
    isPaidTraffic: query.utm_medium === 'cpc',
    gtmKey: getGtmKey(appType, parentId),
    openPaymentLinkInCurrentTab: shouldOpenPaymentLinkInCurrentTab(
      parentId,
      query[WL_QUERY_PARAMS.paymentLinkInCurrentTab],
    ),
    originalUrl: ctx.href,
    benefitCode: ctx.cookies.get('benefit_code'),
    isMobileAppRaffle: query.utm_campaign === 'sravni_osago_mobile_lottery_page',
  };

  await next();
};
