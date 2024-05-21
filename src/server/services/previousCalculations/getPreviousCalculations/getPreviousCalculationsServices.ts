import type { PreviousCalculation } from 'commonTypes/api/previousCalculations';

import { config } from '../../../constants/config';
import { requestWithoutTokenGet } from '../../../utils/api/api';
import type { AuthorizationHeader } from '../../../utils/getUserToken';
import { mapBackCategoriesEnumToString } from '../mapBackCategoriesEnumToString';

export const getPreviousCalculations = async (userToken: AuthorizationHeader) => {
  const { data } = await requestWithoutTokenGet<PreviousCalculation.GetCalculations>(
    `${config.OSAGO_STAFF}/v1/usersearches/last`,
    {
      headers: userToken,
    },
  );

  return mapBackCategoriesEnumToString(data);
};
