import type { PreviousCalculation } from 'commonTypes/api/previousCalculations';
import { BFF_PROXY_API } from 'constants/apiRoutes';

import { axiosWithoutRetries } from '../requestInstance';

export const getPolicies = async (): Promise<PreviousCalculation.GetProlongationPolicies> => {
  const { data } = await axiosWithoutRetries.get(BFF_PROXY_API.getPolicies);

  return data;
};
