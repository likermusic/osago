import type { ICompaniesByIdResult } from '../../insuranceCompanies/interfaces';

export const convertCompaniesToMap = (companies: Nullable<ICompaniesByIdResult>): Record<number, ILocation> =>
  companies?.reduce((acc, company) => {
    if (company.id) {
      return {
        ...acc,
        [company.id]: company,
      };
    }

    return acc;
  }, {}) || {};
