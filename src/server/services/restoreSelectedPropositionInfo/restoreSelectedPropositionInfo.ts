import type { RestoreSelectedProposition } from 'commonTypes/api/restoreSelectedProposition';

import { config } from '../../constants/config';
import { requestWithoutTokenGet } from '../../utils/api/api';

export const restoreSelectedPropositionInfoRequest = async (orderHash: string) => {
  const { data } = await requestWithoutTokenGet<RestoreSelectedProposition.Response>(
    // true на бэке по дефолту захардкожено при переезде osago -> osagogateway
    `${config.OSAGO_STAFF}/v1/order/${encodeURI(orderHash)}/tehinfo?ignoreLastDnd=true`,
  );

  return data;
};
