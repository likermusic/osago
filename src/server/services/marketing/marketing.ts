import type { Marketing } from 'commonTypes/api/marketing';

import { config } from '../../constants/config';
import { requestWithoutTokenGet } from '../../utils/api/api';

export const getMarketingInfo = async () => {
  const { data } = await requestWithoutTokenGet<Marketing.GetMarketingInfoResponse>(
    `${config.OSAGOGATEWAY}/v1/events/marketing`,
  );

  return data;
};
