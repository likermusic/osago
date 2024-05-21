import { config } from '../../constants/config';
import { requestWithoutTokenGet } from '../../utils/api/api';

export const verifyQueryHash = async (searchId: string, hash: string) => {
  await requestWithoutTokenGet(
    `${config.OSAGO_STAFF}/v1.0/saved-queries/${encodeURIComponent(searchId)}/${encodeURIComponent(hash)}`,
  );
};
