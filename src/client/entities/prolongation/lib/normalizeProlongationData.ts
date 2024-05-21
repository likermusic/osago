import type { TFoundedProlongationPolicy } from '../types';

import { mapAuthorizedData } from './mapAutorizedData';
import { mapUnauthorizedData } from './mapUnautorizedData';

export const normalizeProlongationData = (data: TFoundedProlongationPolicy['prolongationPolicyByCarNumber']) => {
  if (!data?.type) {
    return {
      description: '',
    };
  }

  return {
    description: data.description,
    infoAuth: mapAuthorizedData(data)[data.type],
    infoUnAuth: mapUnauthorizedData(data)[data.type],
    maskedPhone: data.maskedPhone,
    orderHash: data.orderHash,
    type: data.type,
  };
};
