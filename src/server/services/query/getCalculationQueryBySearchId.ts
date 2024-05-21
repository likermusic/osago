import type { Query } from '../../../types/api/query';
import { config } from '../../constants/config';
import { requestWithTokenGet } from '../../utils/api/api';

export const getCalculationQueryBySearchId = async ({
  hash,
  id,
}: Query.TRestoreCalculationQueryBySearchIdQuery): Promise<Query.TRestoreCalculationQueryResponse> => {
  const { data } = await requestWithTokenGet<Query.TRestoreCalculationQueryResponse>(
    `${config.OSAGOGATEWAY}/v1/queries/id/${id}/hash/${encodeURI(hash)}`,
    '',
  );

  return data;
};
