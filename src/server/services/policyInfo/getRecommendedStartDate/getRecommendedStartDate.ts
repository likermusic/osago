import type { PolicyInfo } from 'commonTypes/api/policyInfo';

import { config } from '../../../constants/config';
import { requestWithTokenPost } from '../../../utils/api/api';

export const getRecommendedStartDate = async (query: PolicyInfo.GetRecommendedStartDateReq) => {
  const { data } = await requestWithTokenPost<
    PolicyInfo.GetRecommendedStartDateRes,
    PolicyInfo.GetRecommendedStartDateReq
  >(`${config.OSAGOGATEWAY}/v1/calculations/recommendedstartdate`, config.OSAGOGATEWAY_SERVICE_SCOPE, query);

  return data;
};
