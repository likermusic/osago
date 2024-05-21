import logger from '@sravni/server-utils/lib/logger';
import type { Next } from 'koa';

import { getAllInsuranceCompanies } from '../services/insurance';
import { normalizeInsuranceCompaniesResponse } from '../utils/normalizers/responses/normalizeInsuranceCompaniesResponse';

export const loadInsuranceCompanies = async (ctx: App.IKoaContext, next: Next) => {
  if (ctx.req.__INSURANCE_COMPANIES__?.companies) {
    return next();
  }

  try {
    const hiddenInsuranceCompanies = ctx.req.__HIDDEN_INSURANCE_COMPANIES__ ?? [];

    const data = await getAllInsuranceCompanies();
    const { companies, list } = normalizeInsuranceCompaniesResponse(data, hiddenInsuranceCompanies);
    ctx.req.__INSURANCE_COMPANIES__ = {
      companies,
      idList: list,
    };
  } catch (e) {
    logger.error({
      context: 'insurances',
      message: 'Cant load insurances',
      exception: {
        message: e.message,
      },
    });
  }
  return next();
};
