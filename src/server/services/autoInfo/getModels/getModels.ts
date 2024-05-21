import type { Auto } from 'commonTypes/api/auto';

import { config } from '../../../constants/config';
import { requestWithoutTokenGet, requestWithoutTokenGetRetriable } from '../../../utils/api/api';

const generateUrl = (brandId: string | number) =>
  `${config.AUTO}/v1/brand/${brandId}/models?yearFrom=1950&categories=A&categories=B&categories=C&categories=D`;

export const getModels = async (brandId: string | number): Promise<Auto.GetModels> => {
  const { data } = await requestWithoutTokenGet<Auto.GetModels>(generateUrl(brandId));

  return data;
};

export const getModelsRetriable = async (brandId: string | number): Promise<Auto.GetModels> => {
  const { data } = await requestWithoutTokenGetRetriable<Auto.GetModels>(generateUrl(brandId));

  return data;
};
