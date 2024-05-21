import { BASE_TIMEOUT } from 'constants/apiTimeout';

import { mockAxiosPost, CROSS_ORDERS_MOCK, mockAxiosGet } from '../../../../../__mocks__';
import { postCrossOrders } from '../crossOrdersServices';

describe('WHEN "postCrossCalculations" is called', () => {
  const req = {
    propositionHash: 'propositionHash',
    utm: {
      medium: '',
      source: '',
      campaign: '',
    },
  };

  describe('AND "propositionHash" was not provided', () => {
    it('MUST return empty list', async () => {
      expect(await postCrossOrders({ propositionHash: '' })).toBeNull();
    });

    it('MUST NOT do query to server', async () => {
      await postCrossOrders({ propositionHash: '' });

      expect(mockAxiosGet).not.toHaveBeenCalled();
    });
  });

  beforeAll(() => {
    mockAxiosPost.mockResolvedValue({ data: CROSS_ORDERS_MOCK });
  });

  it('MUST do request to service', async () => {
    await postCrossOrders(req);

    expect(mockAxiosPost).toHaveBeenCalledWith(`<OSAGOGATEWAY>/v1/x/order`, req, { timeout: BASE_TIMEOUT });
  });

  it('MUST start calculations orders and return info about orders', async () => {
    expect(await postCrossOrders(req)).toEqual(CROSS_ORDERS_MOCK);
  });
});
