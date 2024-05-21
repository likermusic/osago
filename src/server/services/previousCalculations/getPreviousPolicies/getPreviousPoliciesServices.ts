import type { PreviousCalculation } from 'commonTypes/api/previousCalculations';

import { config } from '../../../constants/config';
import { requestWithoutTokenGet } from '../../../utils/api/api';
import type { AuthorizationHeader } from '../../../utils/getUserToken';
import { mapBackCategoriesEnumToString } from '../mapBackCategoriesEnumToString';

export const getPreviousPolicies = async (userToken: AuthorizationHeader) => {
  const { data } = await requestWithoutTokenGet<PreviousCalculation.GetProlongationPolicies>(
    `${config.OSAGO_STAFF}/v1/userorders/last`,
    {
      headers: userToken,
    },
  );

  return mapBackCategoriesEnumToString(data);
};
