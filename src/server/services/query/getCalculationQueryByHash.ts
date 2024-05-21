import type { Query } from '../../../types/api/query';
import { config } from '../../constants/config';
import { requestWithTokenGet } from '../../utils/api/api';

export const getCalculationQueryByHash = async ({
  hash,
}: Query.TRestoreCalculationQueryByHashQuery): Promise<Query.TRestoreCalculationQueryResponse> => {
  const { data } = await requestWithTokenGet<Query.TRestoreCalculationQueryResponse>(
    `${config.OSAGOGATEWAY}/v1/queries/searchHash/${encodeURI(hash)}/restore`,
    '',
  );

  return data;
};
