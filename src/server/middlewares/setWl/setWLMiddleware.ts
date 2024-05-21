import type { Next } from 'koa';

import { WL_QUERY_PARAMS } from '../../../constants';
import { getParentId } from '../utils/getParentId';

import { collectAnalyticsParameters } from './collectAnalyticsParameters';
import { preferredCompaniesIdsByPartnerId } from './config';
import { configLogoPlateForLanding } from './configLogoPlateForLanding';
import { isWL } from './isWl';

export const setWLMiddleware = async (ctx: App.ExtendedContext, next: Next) => {
  const partnerId = await getParentId(ctx);

  if (partnerId && isWL(ctx.path)) {
    ctx.req.__WL__ = {
      analytics: collectAnalyticsParameters(ctx, partnerId),
      egarantLink: (ctx.query[WL_QUERY_PARAMS.egarant] as string) || '',
      nonPartnerWl: (ctx.query[WL_QUERY_PARAMS.nonPartnerWl] as unknown as boolean) || false,
      parameters: configLogoPlateForLanding(ctx),
      partnerId,
    };

    ctx.req.__PREFERRED_COMPANIES__ = preferredCompaniesIdsByPartnerId[partnerId];
  }

  await next();
};
