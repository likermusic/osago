import type { Driver } from 'commonTypes/api/driver';

import { config } from '../../constants/config';
import { requestWithTokenPost } from '../../utils/api/api';

export const getDriverKbmRequest = async (body: Driver.GetDriverKbmRequest) => {
  const { data } = await requestWithTokenPost<Driver.GetDriverKbmResponse, Driver.GetDriverKbmRequest>(
    `${config.OSAGOGATEWAY}/coefficients/kbm`,
    config.OSAGOGATEWAY_SERVICE_SCOPE,
    body,
  );

  return data;
};
