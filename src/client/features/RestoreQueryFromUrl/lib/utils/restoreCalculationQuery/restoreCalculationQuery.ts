import type { AxiosResponse } from 'axios';

import type { Query } from 'commonTypes/api/query';
import { BFF_PROXY_API } from 'constants/apiRoutes';

import { axiosWithRetry } from 'shared/api/requestInstance';

export type RestoreCalculationQuery = { orderHash: string; hash: string; calculationHash: string; searchId: string };

/**
 * Восстанавливаем данные калькуляции из нескольких источников
 *  @param query.orderHash - Восстанавливаем данные для формы по ранее созданному заказу
 *  @param query.calculationHash - Восстанавливаем данные для формы по ранее созданному расчету
 *  @param query.searchId
 *  @param query.hash  - searchId и hash два параметра получаемые при заполнении формы данными.
 *  Для восстановления формы нужны оба
 * */
export const restoreCalculationQuery = async (
  query: Partial<RestoreCalculationQuery>,
): Promise<Nullable<Query.TRestoreCalculationQueryResponse>> => {
  const { data } = await axiosWithRetry.get<
    Partial<RestoreCalculationQuery>,
    AxiosResponse<Query.TRestoreCalculationQueryResponse>
  >(BFF_PROXY_API.restoreCalculationQuery, {
    params: query,
  });

  return data;
};
