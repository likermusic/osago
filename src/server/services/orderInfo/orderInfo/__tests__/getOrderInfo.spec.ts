import { BASE_TIMEOUT } from 'constants/apiTimeout';

import { mockAxiosGet, GET_ORDER_INFO_MOCK } from '../../../../../__mocks__';
import { getOrderInfoRequest } from '../orderInfoServices';

describe('WHEN "getOrderInfo" is called', () => {
  const orderHash = 'orderHash';
  const isForce = false;

  describe('AND "order hash" was not provided', () => {
    it('MUST return empty list', async () => {
      expect(await getOrderInfoRequest('', isForce)).toBeNull();
    });

    it('MUST NOT do query to server', async () => {
      await getOrderInfoRequest('', isForce);

      expect(mockAxiosGet).not.toHaveBeenCalled();
    });
  });

  beforeAll(() => {
    mockAxiosGet.mockResolvedValue({ data: GET_ORDER_INFO_MOCK });
  });

  it('MUST do request to service', async () => {
    await getOrderInfoRequest(orderHash, false);

    expect(mockAxiosGet).toHaveBeenCalledWith(
      `<OSAGOGATEWAY>/v1/many-orders/${encodeURI(orderHash)}/info?force=${isForce}`,
      { timeout: BASE_TIMEOUT },
    );
  });

  it('MUST return data about order', async () => {
    expect(await getOrderInfoRequest(orderHash, false)).toEqual(GET_ORDER_INFO_MOCK);
  });
});
