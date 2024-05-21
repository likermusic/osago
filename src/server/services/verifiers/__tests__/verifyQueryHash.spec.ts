import { BASE_TIMEOUT } from 'constants/apiTimeout';
import { mockAxiosGet } from 'mocks/helpers';

import { verifyQueryHash } from '../verifyQueryHash';

const searchId = '123';
const hash = '456';

describe('WHEN "verifyQueryHash" is called', () => {
  it('MUST do request to OSAGO_STAFF service', async () => {
    await verifyQueryHash(searchId, hash);

    expect(mockAxiosGet).toHaveBeenCalledWith(
      `<OSAGO_STAFF>/v1.0/saved-queries/${encodeURIComponent(searchId)}/${encodeURIComponent(hash)}`,
      { timeout: BASE_TIMEOUT },
    );
  });

  it('MUST return nothing', async () => {
    expect(await verifyQueryHash('123', '456')).toEqual(undefined);
  });
});
