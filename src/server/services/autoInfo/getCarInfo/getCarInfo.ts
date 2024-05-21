import type { Auto } from '../../../../types/api/auto';
import { config } from '../../../constants/config';
import { requestWithTokenGet } from '../../../utils/api/api';
import { encodeObjectToQuery } from '../../../utils/encodeObjectToQuery';
import { getCarModification } from '../getCarModification/getCarModification';

export const getCarInfo = async (query: Auto.AutoInfoRequest): Promise<Auto.AutoInfo> => {
  const { data } = await requestWithTokenGet<Auto.GetAutoInfo>(
    `${config.OSAGOGATEWAY}/auto/v1/info/?${encodeObjectToQuery(query)}`,
    [config.OSAGOGATEWAY_SERVICE_SCOPE, config.AUTO_SERVICE_CAR_INFO_SCOPE].join(' '),
  );

  const { brand, model, year, power } = data;

  const modifications =
    brand?.id && model?.id && year && power ? await getCarModification(brand.id, model.id, year, power) : [];

  return {
    ...data,
    modifications,
  };
};
