import { BASE_TIMEOUT } from 'constants/apiTimeout';
import { mockAxiosGet, TEST_ERROR } from 'mocks/helpers';

import { requestOrderInfoQuery } from '../requestOrderInfoQuery';

describe('WHEN "requestOrderInfoQuery" is called', () => {
  beforeEach(() => {
    mockAxiosGet.mockResolvedValue({ data: {} });
  });

  it('MUST request data fro offer from osago staff service', async () => {
    await requestOrderInfoQuery('hash');

    expect(mockAxiosGet).toHaveBeenCalledWith('<OSAGO_STAFF>/v1.0/order/hash/queries', {
      params: { ignoreLastDnd: 'true' },
      timeout: BASE_TIMEOUT,
    });
  });

  it('AND hash was not provided, MUST NOT do request', async () => {
    await requestOrderInfoQuery([]);

    expect(mockAxiosGet).not.toHaveBeenCalled();
  });

  it('AND request failed, MUST return null', async () => {
    mockAxiosGet.mockRejectedValue(TEST_ERROR);

    expect(await requestOrderInfoQuery('')).toEqual(null);
  });
});
