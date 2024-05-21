import { config } from '../../constants/config';
import { requestWithoutTokenGet } from '../../utils/api/api';

export const verifyOrderHash = async (orderHash: string) => {
  await requestWithoutTokenGet(`${config.OSAGO_STAFF}/v1.0/order/${encodeURI(orderHash)}/queries?ignoreLastDnd=true`);
};
