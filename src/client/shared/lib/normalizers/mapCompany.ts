import type { PropositionCalculations } from 'commonTypes/api/propositionCalculations';
import { getMobileLogoLinkFromCompanyId } from 'commonUtils/getLogoLinkFromCompanyId';

import type {
  TNonNullableCalculationPropositionCompany,
  TRequiredOfferWithNonNullableCompanyProps,
} from 'shared/types';

import type { ICalculationProposition } from '../../types/ICardProposition';

export const mapFullCompany = (
  company: TNonNullableCalculationPropositionCompany | TRequiredOfferWithNonNullableCompanyProps,
): ICalculationProposition['company'] => ({
  companyId: company?.id,
  companyName: company?.name,
  logoLink: getMobileLogoLinkFromCompanyId(company?.id),
  averageRating: company?.main?.stars,
});

export const mapCompany = (
  company: PropositionCalculations.GetManyOrders['orderInfo']['company'],
): ICalculationProposition['company'] | null =>
  company?.id && company?.name
    ? {
        companyId: company?.id,
        companyName: company?.name,
        logoLink: getMobileLogoLinkFromCompanyId(company?.id),
      }
    : null;
