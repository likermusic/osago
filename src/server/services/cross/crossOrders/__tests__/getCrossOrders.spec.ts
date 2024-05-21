import { BASE_TIMEOUT } from 'constants/apiTimeout';

import { mockAxiosGet, CROSS_ORDERS_MOCK } from '../../../../../__mocks__';
import { getCrossOrders } from '../crossOrdersServices';

describe('WHEN "getCrossCalculations" is called', () => {
  const hash = 'hash';

  describe('AND "hash" was not provided', () => {
    it('MUST return empty list', async () => {
      expect(await getCrossOrders('')).toBeNull();
    });

    it('MUST NOT do query to server', async () => {
      await getCrossOrders('');

      expect(mockAxiosGet).not.toHaveBeenCalled();
    });
  });

  beforeAll(() => {
    mockAxiosGet.mockResolvedValue({ data: CROSS_ORDERS_MOCK });
  });

  it('MUST do request to service', async () => {
    await getCrossOrders(hash);

    expect(mockAxiosGet).toHaveBeenCalledWith(`<OSAGOGATEWAY>/v1/x/order/${encodeURI(hash)}`, {
      timeout: BASE_TIMEOUT,
    });
  });

  it('MUST return cross orders', async () => {
    expect(await getCrossOrders(hash)).toEqual(CROSS_ORDERS_MOCK);
  });
});
