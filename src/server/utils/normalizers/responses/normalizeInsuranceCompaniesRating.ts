import type { IInsuranceCompaniesRatings } from 'commonTypes/insuranceCompanies';
import type { RatingsAPI } from 'commonTypes/ratings';

export const normalizeInsuranceCompaniesRating = (
  rating: RatingsAPI.InsuranceRatingResultsInsuranceCompanyRating,
): IInsuranceCompaniesRatings =>
  rating.results.map((result) => ({
    reviewRating: {
      insuranceCompanyAnswersCount: result.reviewRating.insuranceCompanyAnswersCount,
      resolvedProblemsCount: result.reviewRating.resolvedProblemsCount,
      reviewsCount: result.reviewRating.reviewsCount,
    },
    insuranceCompanyId: result.insuranceCompanyId,
  })) || [];
