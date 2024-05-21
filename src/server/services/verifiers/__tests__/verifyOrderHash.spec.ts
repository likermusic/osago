import { BASE_TIMEOUT } from 'constants/apiTimeout';
import { mockAxiosGet } from 'mocks/helpers';

import { verifyOrderHash } from '../verifyOrderHash';

const orderHash = '123';

describe('WHEN "verifyOrderHash" is called', () => {
  it('MUST do request to OSAGO_STAFF service', async () => {
    await verifyOrderHash(orderHash);

    expect(mockAxiosGet).toHaveBeenCalledWith(
      `<OSAGO_STAFF>/v1.0/order/${encodeURI(orderHash)}/queries?ignoreLastDnd=true`,
      { timeout: BASE_TIMEOUT },
    );
  });

  it('MUST return nothing', async () => {
    expect(await verifyOrderHash(orderHash)).toEqual(undefined);
  });
});
