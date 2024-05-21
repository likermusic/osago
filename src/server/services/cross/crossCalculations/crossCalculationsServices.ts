import type { Cross } from 'commonTypes/api/cross';

import { config } from '../../../constants/config';
import { requestWithoutTokenPost, requestWithTokenGet } from '../../../utils/api/api';

export const getCrossCalculations = async (crossHash: string) => {
  if (!crossHash) {
    return null;
  }

  const { data } = await requestWithTokenGet<Cross.GetCrossCalculations>(
    `${config.OSAGOGATEWAY}/v1/x/calculation/${encodeURI(crossHash)}`,
    config.OSAGOGATEWAY_SERVICE_SCOPE,
  );

  return data;
};

export const postCrossCalculations = async (orderHash: string) => {
  if (!orderHash) {
    return null;
  }
  try {
    const { data } = await requestWithoutTokenPost<Cross.PostCrossCalculations>(
      `${config.OSAGOGATEWAY}/v1/x/calculation`,
      {
        orderHash,
      },
    );
    return data;
  } catch (_) {
    return null;
  }
};
