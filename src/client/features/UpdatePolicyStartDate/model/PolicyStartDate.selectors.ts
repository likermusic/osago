import { createSelector } from 'reselect';

import type { IInsuranceCompaniesFullMap } from 'entities/insuranceCompanies';
import { insuranceCompaniesFullMapSelector } from 'entities/insuranceCompanies';
import { selectedPropositionSelector } from 'entities/selectedProposition';

export const selectedCompanySelector = createSelector(
  insuranceCompaniesFullMapSelector,
  selectedPropositionSelector,
  (companies, selectedProposition) =>
    companies[selectedProposition?.activeCompanyId as keyof IInsuranceCompaniesFullMap],
);
