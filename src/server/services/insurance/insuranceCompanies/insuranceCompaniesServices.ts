import withMemoryCache from '@sravni/server-utils/lib/utils/withMemoryCache';

import type { ProviderInfo } from 'commonTypes/insuranceCompanies';

import { config } from '../../../constants/config';
import { requestWithoutTokenGet } from '../../../utils/api/api';

import type { ICompaniesByIdResult, ICompanyDetailsResult } from './interfaces';

export const getAllInsuranceCompanies = withMemoryCache(async (): Promise<ProviderInfo[]> => {
  const { data } = await requestWithoutTokenGet<ProviderInfo[]>(`${config.APIGATEWAY}/osago/v1.0/providers`);

  return data;
});

export const getInsuranceCompaniesByIds = async (ids: string[]): Promise<Nullable<ICompaniesByIdResult>> => {
  if (!ids?.length) {
    return null;
  }

  const { data } = await requestWithoutTokenGet<ICompaniesByIdResult>(
    `${config.INSURANCECOMPANIES}/v1.0/companies?ids=${ids.join()}`,
  );

  return data;
};

export const getInsuranceCompanyByAlias = withMemoryCache(
  async (aliasOrId: string | undefined): Promise<Nullable<ICompanyDetailsResult>> => {
    if (!aliasOrId) {
      return null;
    }

    const { data } = await requestWithoutTokenGet<ICompanyDetailsResult>(
      `${config.INSURANCECOMPANIES}/v1.0/company-details/${aliasOrId}`,
    );

    return data;
  },
);
