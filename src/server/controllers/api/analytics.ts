import type { Analytics } from 'commonTypes/api/analytics';

import { COOKIE_NAMES } from '../../../constants/cookiesNames';
import * as analytics from '../../services/analytics';
import { getCookie } from '../../utils/analytics';
import { mapCookieToCookiesService } from '../../utils/analytics/mapCookieToCookiesServies';

export const requestAnalyticsEventPost = async (ctx: App.ExtendedContext) => {
  const query = ctx.request.body as Analytics.TEventsRequest;

  ctx.body = await analytics.requestAnalyticsEventPost(query, ctx.user, ctx.headers['user-agent']);
};

export const getUTMCookies = async (ctx: App.ExtendedContext) => {
  const { url } = ctx.query;

  const query = {
    cookies: mapCookieToCookiesService(getCookie(ctx), [COOKIE_NAMES.utm]),
    referer: '',
    url,
  };

  ctx.body = await analytics.requestsUTMCookies(query);
};
