import type { Auto } from 'commonTypes/api/auto';

import { config } from '../../../constants/config';
import { requestWithoutTokenGet, requestWithoutTokenGetRetriable } from '../../../utils/api/api';

const generateUrl = (modelId: string | number) => `${config.AUTO}/v1/model/${modelId}/years`;

export const getManufactureYears = async (modelId: string | number): Promise<Auto.GetManufactureYears> => {
  const { data } = await requestWithoutTokenGet<Auto.GetManufactureYears>(generateUrl(modelId));
  return data;
};

export const getManufactureYearsRetriable = async (modelId: string | number): Promise<Auto.GetManufactureYears> => {
  const { data } = await requestWithoutTokenGetRetriable<Auto.GetManufactureYears>(generateUrl(modelId));
  return data;
};
