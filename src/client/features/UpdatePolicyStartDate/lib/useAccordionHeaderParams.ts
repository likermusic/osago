import { formatDate } from 'commonUtils/formatters';

import { useAppSelector } from 'shared/lib/redux';

import { currentPolicySelector } from 'entities/PolicyInfo';

import { selectedCompanySelector } from '../model/PolicyStartDate.selectors';

export const useAccordionHeaderParams = () => {
  const selectedCompany = useAppSelector(selectedCompanySelector);
  const currentPolicyStartDate = useAppSelector(currentPolicySelector).currentStartDate || '';

  const title = `Полис с ${formatDate.toLocalizedClientFromClient(currentPolicyStartDate)} (на 1 год)`;

  return { title, logoLink: selectedCompany?.mobileLogoLink, companyName: selectedCompany?.name };
};
