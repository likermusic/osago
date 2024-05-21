import logger from '@sravni/server-utils/lib/logger';
import type { Next } from 'koa';

import { SEO_MATCHER } from '../../constants/routes';
import { findRouteByAlias } from '../services/locations/locations';

export const setRegionByRoute = async (ctx: App.ExtendedContext, next: Next): Promise<void> => {
  const extractedParams = SEO_MATCHER.paramsExtractor(ctx.params);
  const regionAlias = extractedParams.productLocation || extractedParams.seoParam || Object.values(extractedParams)[0];

  if (ctx.method !== 'GET' || ctx.xhr || !regionAlias || ctx.request.path.match(/\.([0-9a-z]{1,5})(?:[?#]|$)/i)) {
    return next();
  }

  if (ctx.req.__SELECTED_LOCATION__ && ctx.req.__SELECTED_LOCATION__.alias === regionAlias) {
    return next();
  }

  const COOKIE_OPTIONS = {
    httpOnly: false,
    signed: false,
    maxAge: 365 * 24 * 60 * 60 * 1000,
  };

  try {
    const region = await findRouteByAlias({ alias: regionAlias });

    if (region) {
      ctx.req.__SELECTED_LOCATION__ = region;
      ctx.cookies.set('_SL_', ctx.req.__SELECTED_LOCATION__.route, COOKIE_OPTIONS);
    }
  } catch (error) {
    const url = error.response?.config.url || ctx.url;

    logger.error({
      context: 'LOCATION',
      message: 'Failed to find location by alias',
      request_url: url,
      exception: {
        message: error.message,
        stack: error.stack,
      },
    });

    if (error.response.status === 404) {
      ctx.throw(404, 'Failed to set location by alias');
    }
  }

  return next();
};
