import { isDefined } from '@sravni/react-utils';

import type { PropositionCalculations } from 'commonTypes/api/propositionCalculations';
import { formatDate } from 'commonUtils/formatters';

import { mapAdvantages } from 'shared/lib/normalizers/mapAdvantages';
import { mapAlerts } from 'shared/lib/normalizers/mapAlerts';
import { mapFullCompany } from 'shared/lib/normalizers/mapCompany';
import { mapDescription } from 'shared/lib/normalizers/mapDescription';
import { mapTags, mapTagsAndAddAwards } from 'shared/lib/normalizers/mapTags';
import { sendSentryClientErrorOnce } from 'shared/lib/sendSentryClientError';
import {
  NO_COMPANY_INFO_ERROR,
  NO_OSAGO_ID_ERROR,
  NO_PRICE_INFO_ERROR,
  NO_START_DATE_ERROR,
} from 'shared/lib/validations/Errors.texts';
import type { TNonNullableCalculationPropositionCompany } from 'shared/types';
import type { ICalculationProposition } from 'shared/types/ICardProposition';

const isCompanyAvailable = (
  company: PropositionCalculations.GetCalculations['offers'][number]['company'],
): company is TNonNullableCalculationPropositionCompany => !!company?.id && !!company?.name;

export const mapPropositionResultsResponse = (
  proposition: PropositionCalculations.GetCalculations['offers'][number],
): ICalculationProposition | undefined => {
  try {
    const { company, calcHash, price, osagoId, isProlongation, tags, startDate, alerts, isSectionSponsor, upperTags } =
      proposition;
    if (!isCompanyAvailable(company)) {
      throw new Error(NO_COMPANY_INFO_ERROR);
    }

    if (!price) throw new Error(NO_PRICE_INFO_ERROR);
    if (!startDate) throw new Error(NO_START_DATE_ERROR);
    if (!osagoId) throw new Error(NO_OSAGO_ID_ERROR);

    return {
      id: String(company.id + startDate),
      productId: osagoId,
      price,
      startDate: formatDate.toClientFromServer(startDate),
      isProlongation,
      isSectionSponsor,

      tags: mapTags(tags),
      absoluteTags: mapTagsAndAddAwards(upperTags, company?.id),
      alerts: mapAlerts(alerts),

      company: mapFullCompany(company),
      advantages: mapAdvantages(company),
      description: mapDescription(company, price),
      calcHash: calcHash ?? null,
    };
  } catch (e) {
    sendSentryClientErrorOnce(`${proposition?.calcHash} ${e.message}`, e, {
      calcHash: proposition?.calcHash,
      companyId: proposition?.company?.id,
      price: proposition?.price,
      startDate: proposition?.startDate,
      osagoId: proposition?.osagoId,
    });

    return undefined;
  }
};

export const mapPropositionsResultsResponse = (
  results: PropositionCalculations.GetCalculations['offers'] = [],
): ICalculationProposition[] => results?.map(mapPropositionResultsResponse).filter(isDefined) ?? [];
