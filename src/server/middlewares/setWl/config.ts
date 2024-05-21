import { INSURANCE_COMPANIES_IDS } from '../../../constants/INSURANCE_COMPANIES_IDS';
import { PARTNERS_IDS } from '../../../constants/partners';

export const preferredCompaniesIdsByPartnerId: Record<number, number[]> = {
  [PARTNERS_IDS.beeline]: [INSURANCE_COMPANIES_IDS.alfaStrahovanie],
  [PARTNERS_IDS.sovcombank]: [INSURANCE_COMPANIES_IDS.sovkombankStrahovanie],
};

export const plateDisclaimers = 'РЕКЛАМА | SRAVNI.RU';
