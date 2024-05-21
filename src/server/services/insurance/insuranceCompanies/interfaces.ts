import type { INSURANCECOMPANIES_API } from '../../../../generatedDTO';

export type ICompaniesByIdResult =
  INSURANCECOMPANIES_API['/v1/companies']['get']['responses']['200']['content']['application/json'];

export type ICompanyDetailsResult =
  INSURANCECOMPANIES_API['/v1/company-details/{alias}']['get']['responses']['200']['content']['application/json'];
