import type { IInsuranceCompaniesFullMapBFF } from 'commonTypes/insuranceCompanies';

export type IInsuranceCompaniesFullMap = IInsuranceCompaniesFullMapBFF;

export type IInsuranceCompaniesRating = {
  insuranceCompanyId: number;
  reviewRating: {
    insuranceCompanyAnswersCount: number;
    resolvedProblemsCount: number;
    reviewsCount: number;
  };
};

export type IInsuranceCompaniesRatings = IInsuranceCompaniesRating[];

export interface ICompaniesRatingElement {
  alias: string;
  fullRating: Pick<IInsuranceCompaniesRatings[0], 'reviewRating'>;
  mobileLogoLink: string;
  name: string;
  clientRating: number;
  reviewUrl: string;
}

export interface StateInsuranceCompanies {
  fullCompaniesMap: IInsuranceCompaniesFullMap;
  idList: number[];
  ratings: IInsuranceCompaniesRatings;
}
