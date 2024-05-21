import type { AxiosResponse } from 'axios';

import type { Auto } from 'commonTypes/api/auto';
import { BFF_PROXY_API } from 'constants/apiRoutes';

import { axiosWithRetry } from 'shared/api/requestInstance';

/**
 * Восстанавливаем данные по тачке чеpеp закодированный номер авто
 * */
export const restoreCarByCarToken = async (carNumberToken: string): Promise<Nullable<Auto.AutoInfo>> => {
  if (!carNumberToken) {
    return null;
  }

  try {
    const { data } = await axiosWithRetry.post<
      Auto.TAutoInfoDictionaryRequest,
      AxiosResponse<Auto.TCalculationQueryDictionary>
    >(BFF_PROXY_API.getRegNumberTokenInfo, { carNumberToken });
    return data;
  } catch (e) {
    return null;
  }
};
