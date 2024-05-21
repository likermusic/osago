import type { IReviewsApi } from 'commonTypes/insuranceCompanies';

import { config } from '../../../constants/config';
import { requestWithoutTokenGet } from '../../../utils/api/api';

import { generateReviewsParams } from './utils/generateReviewsParams';

export const getReviews = async (locationId?: string, companyId?: string): Promise<IReviewsApi> => {
  const { data } = await requestWithoutTokenGet<IReviewsApi>(`${config.OSAGOGATEWAY}/v1/reviews`, {
    params: generateReviewsParams(locationId, companyId),
  });

  return data;
};
