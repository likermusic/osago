import logger from '@sravni/server-utils/lib/logger';

import {
  getCalculationQueryByHash,
  getCalculationQueryByOrderHash,
  getCalculationQueryBySearchId,
} from '../../services/query';
import { getParamsFromKoaContext } from '../../utils/getParamsFromContext';

/**
 * Восстанавливаем данные по калькуляции на основе параметров запроса из разных источников
 * */
export const restoreCalculationQuery = async (ctx: App.ExtendedContext) => {
  const params = getParamsFromKoaContext<
    Partial<{
      orderHash: string;
      hash: string;
      calculationHash: string;
      searchId: string;
    }>
  >(ctx);

  const { orderHash, hash, calculationHash, searchId } = params;

  let data = null;
  if (calculationHash) {
    data = await getCalculationQueryByHash({ hash: calculationHash });
  } else if (orderHash) {
    data = await getCalculationQueryByOrderHash({ orderHash });
  } else if (hash && searchId) {
    data = await getCalculationQueryBySearchId({ id: Number(searchId), hash });
  }

  if (!data?.userId) {
    logger.log({
      message: 'В данных для восстановления нет userID',
      meta: {
        query: JSON.stringify(data),
        params,
        place: 'restoreCalculationQuery',
      },
      level: 'info',
    });
  }

  ctx.body = data;
};
