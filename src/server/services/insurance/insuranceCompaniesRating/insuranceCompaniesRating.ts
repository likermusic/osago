import withMemoryCache from '@sravni/server-utils/lib/utils/withMemoryCache';

import type { RatingsAPI } from 'commonTypes/ratings';

import { config } from '../../../constants/config';
import { requestWithoutTokenGet } from '../../../utils/api/api';

type TGetCompaniesRatings = {
  date: string;
  insuranceProductType: string;
};

export const getCompaniesRating = withMemoryCache(async (query: TGetCompaniesRatings) => {
  const { date, insuranceProductType } = query;
  const { data } = await requestWithoutTokenGet<RatingsAPI.InsuranceRatingResultsInsuranceCompanyRating>(
    `${config.OSAGOGATEWAY}/v1/rating/insurance-companies/summary?date=${date}&insuranceProductType=${insuranceProductType}`,
  );

  return data;
});
