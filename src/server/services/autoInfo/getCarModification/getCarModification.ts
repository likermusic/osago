import type { Auto } from 'commonTypes/api/auto';

import { config } from '../../../constants/config';
import { requestWithoutTokenGet, requestWithoutTokenGetRetriable } from '../../../utils/api/api';

const generateUrl = (brandId: string | number, modelId: string | number, yearFrom: string | number, power: number) =>
  `${config.AUTO}/v1/brand/${brandId}/years/${yearFrom}/models/${modelId}/powers/${power}/modifications`;

export const getCarModification = async (
  brandId: string | number,
  modelId: string | number,
  yearFrom: number,
  power: number,
): Promise<Auto.GetModification> => {
  const { data } = await requestWithoutTokenGet<Auto.GetModification>(generateUrl(brandId, modelId, yearFrom, power));

  return data;
};

export const getCarModificationRetriable = async (
  brandId: string | number,
  modelId: string | number,
  yearFrom: number,
  power: number,
): Promise<Auto.GetModification> => {
  const { data } = await requestWithoutTokenGetRetriable<Auto.GetModification>(
    generateUrl(brandId, modelId, yearFrom, power),
  );

  return data;
};
