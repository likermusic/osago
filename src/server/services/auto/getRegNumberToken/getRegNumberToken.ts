import type { Auto } from 'commonTypes/api/auto';

import { objectToQuery } from '../../../../commonUtils';
import { config } from '../../../constants/config';
import { requestWithTokenGet } from '../../../utils/api/api';

export const getRegNumberToken = async (regNumber: string) => {
  const { data } = await requestWithTokenGet<Auto.GetRegNumberToken>(
    `${config.OSAGOGATEWAY}/auto/v1/regnumber-token?regNumber=${encodeURIComponent(regNumber)}`,
    config.OSAGOGATEWAY_SERVICE_SCOPE,
  );

  return data;
};

export interface IDecodeRegNumberToken {
  regNumberToken: string;
  utm?: {
    campaign?: string;
    medium?: string;
    source?: string;
  };
  partnerUtm?: {
    source?: string;
    medium?: string;
    campaign?: string;
  };
  userAgent?: string;
}
export const decodeRegNumberToken = async (params: IDecodeRegNumberToken) => {
  const query: Auto.GetRegNumberTokenInfoRequest = {
    regNumberToken: params.regNumberToken,
    'utm.campaign': params.utm?.campaign,
    'utm.medium': params.utm?.medium,
    'utm.source': params.utm?.source,
    'partnerUtm.source': params.partnerUtm?.source,
    'partnerUtm.medium': params.partnerUtm?.medium,
    'partnerUtm.campaign': params.partnerUtm?.campaign,
    userAgent: params.userAgent,
  };

  const { data } = await requestWithTokenGet<Auto.GetRegNumberTokenInfoResponse>(
    `${config.OSAGOGATEWAY}/auto/v1/regnumber-token-info?${objectToQuery(query)}`,
    config.OSAGOGATEWAY_SERVICE_SCOPE,
  );

  return data;
};
