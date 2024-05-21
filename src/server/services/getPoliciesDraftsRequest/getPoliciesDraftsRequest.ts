import type { PoliciesDrafts } from 'commonTypes/api/policiesDrafts';

import { config } from '../../constants/config';
import { requestWithTokenPost } from '../../utils/api/api';

export const getPoliciesDraftsRequest = async (query: PoliciesDrafts.Request, companyId: number | undefined) => {
  const { data } = await requestWithTokenPost<PoliciesDrafts.Response, PoliciesDrafts.Request>(
    `${config.OSAGOGATEWAY}/v1/policydrafts`,
    config.OSAGOGATEWAY_SERVICE_SCOPE,
    query,
    // force = true иначе кешируются данные и не всегда обновляется полис
    { params: { companyId, force: true } },
  );

  return data;
};
