import type { Auto } from 'commonTypes/api/auto';

import { config } from '../../../constants/config';
import { requestWithoutTokenGet, requestWithoutTokenGetRetriable } from '../../../utils/api/api';

const generateUrl = (brandId: string | number, modelId: string | number, year: string | number) =>
  `${config.AUTO}/v1/brand/${brandId}/years/${year}/models/${modelId}/engine-powers`;

export const getCarEnginePowers = async (
  brandId: string | number,
  modelId: string | number,
  year: string | number,
): Promise<Auto.GetCarEnginePowers> => {
  const { data } = await requestWithoutTokenGet<Auto.GetCarEnginePowers>(generateUrl(brandId, modelId, year));

  return data;
};

export const getCarEnginePowersRetriable = async (
  brandId: string | number,
  modelId: string | number,
  year: string | number,
): Promise<Auto.GetCarEnginePowers> => {
  const { data } = await requestWithoutTokenGetRetriable<Auto.GetCarEnginePowers>(generateUrl(brandId, modelId, year));

  return data;
};
