import { AUTH_HEADER_MOCK } from 'mocks/authHeader';
import { mockAxiosGet } from 'mocks/helpers';

import { disableUpSaleRequest } from '../disableUpSale';

const orderHash = '123';

describe('WHEN "disableUpsaleRequest" is called', () => {
  beforeAll(() => {
    mockAxiosGet.mockResolvedValue({ data: true });
  });
  it('MUST do request to OSAGOGATEWAY service', async () => {
    await disableUpSaleRequest(orderHash);

    expect(mockAxiosGet).toHaveBeenCalledWith(`<OSAGOGATEWAY>/v1/orders/${orderHash}/spoil`, AUTH_HEADER_MOCK);
  });

  it('MUST return true', async () => {
    expect(await disableUpSaleRequest(orderHash)).toEqual(true);
  });
});
