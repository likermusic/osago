import type { AxiosResponse } from 'axios';

import type { Auto } from 'commonTypes/api/auto';
import { BFF_PROXY_API } from 'constants/apiRoutes';

import { axiosWithRetry } from 'shared/api/requestInstance';

/**
 * Восстанавливаем списки для дропдаунов по данным из калькуляции
 * Нужно чтобы пользак смог корректно редактировать данные если ему прижмет
 * */
export const restoreQueryDictionaries = async (
  query: Partial<Auto.TAutoInfoDictionaryRequest>,
): Promise<Nullable<Auto.TCalculationQueryDictionary>> => {
  const { enginePower, year, modelId, brandId } = query;

  if (!brandId) {
    return null;
  }

  const { data } = await axiosWithRetry.get<
    Auto.TAutoInfoDictionaryRequest,
    AxiosResponse<Auto.TCalculationQueryDictionary>
  >(BFF_PROXY_API.getCarInfoDictionaries, {
    params: {
      enginePower,
      year,
      modelId,
      brandId,
    },
  });

  return data;
};
