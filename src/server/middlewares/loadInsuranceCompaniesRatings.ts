import logger from '@sravni/server-utils/lib/logger';
import dayjs from 'dayjs';
import type { Next } from 'koa';

import { getCompaniesRating, insuranceCompaniesReviews } from '../services/insurance';
import { formatDateServer } from '../utils/formatDateServer';
import { normalizeInsuranceCompaniesRating } from '../utils/normalizers/responses/normalizeInsuranceCompaniesRating';

export const loadInsuranceCompaniesRatings = async (ctx: App.ExtendedContext, next: Next) => {
  if (ctx.req.__INSURANCE_COMPANIES_ALL_RATINGS__) {
    return next();
  }

  try {
    const now = dayjs();
    const date = formatDateServer.toServerFromObject(now);

    const query = {
      date,
      insuranceProductType: 'osago',
    };

    const [ratings, reviews] = await Promise.allSettled([
      getCompaniesRating(query),
      insuranceCompaniesReviews(ctx.req.__SELECTED_LOCATION__?.id, ctx.req.__SEO_META__?.company),
    ]);

    if (reviews.status === 'fulfilled') {
      ctx.req.__REVIEWS__ = reviews.value;
    }

    if (ratings.status === 'fulfilled') {
      ctx.req.__INSURANCE_COMPANIES_ALL_RATINGS__ = normalizeInsuranceCompaniesRating(ratings.value);
    }
  } catch (e) {
    logger.error({
      context: 'ratings',
      message: 'Cant load ratings',
      exception: {
        message: e.message,
      },
    });
  }

  return next();
};
