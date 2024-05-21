import type { IInsuranceCompaniesFullMapBFF, ProviderInfo } from 'commonTypes/insuranceCompanies';

import {
  getLogoLinkFromCompanyId,
  getGreyLogoLinkFromCompanyId,
  getMobileLogoLinkFromCompanyId,
} from '../../../../commonUtils/getLogoLinkFromCompanyId';

export const normalizeInsuranceCompaniesResponse = (
  insuranceCompaniesResponse: ProviderInfo[],
  hiddenInsuranceCompanies: number[],
) => {
  const companies: IInsuranceCompaniesFullMapBFF = {};
  const list: number[] = [];

  insuranceCompaniesResponse
    .filter((company) => !hiddenInsuranceCompanies.includes(company.provider.id))
    .forEach((company) => {
      const companyId = company.provider.id;
      list.push(companyId);

      companies[companyId] = {
        alias: company.provider.alias,
        license: company.osagoLicense,
        logoLink: getLogoLinkFromCompanyId(companyId),
        greyLogoLink: getGreyLogoLinkFromCompanyId(companyId),
        mobileLogoLink: getMobileLogoLinkFromCompanyId(companyId),
        name: company.provider.name,
        reviewUrl: company.reviewInfo.url,
        clientRating: company.reviewInfo.overallClientRating,
        companyId,
      };
    });

  return { companies, list };
};
