import type { Auto } from 'commonTypes/api/auto';

import { config } from '../../../constants/config';
import { requestWithTokenGet, requestWithTokenGetRetriable } from '../../../utils/api/api';

const URL = `${config.OSAGOGATEWAY}/auto/v1/brands?yearFrom=1950&categories=A&categories=B&categories=C&categories=D`;

export const getBrands = async () => {
  const { data } = await requestWithTokenGet<Auto.GetBrands>(URL, config.OSAGOGATEWAY_SERVICE_SCOPE);
  return data;
};

export const getBrandsRetriable = async () => {
  const { data } = await requestWithTokenGetRetriable<Auto.GetBrands>(URL, config.OSAGOGATEWAY_SERVICE_SCOPE);
  return data;
};
