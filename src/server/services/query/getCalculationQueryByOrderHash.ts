import type { Query } from '../../../types/api/query';
import { config } from '../../constants/config';
import { requestWithTokenGet } from '../../utils/api/api';

export const getCalculationQueryByOrderHash = async ({
  orderHash,
}: Query.TRestoreCalculationQueryByOrderHashQuery): Promise<Query.TRestoreCalculationQueryResponse> => {
  const { data } = await requestWithTokenGet<Query.TRestoreCalculationQueryResponse>(
    `${config.OSAGOGATEWAY}/v1/queries/orderHash/${encodeURI(orderHash)}`,
    '',
  );

  return data;
};
