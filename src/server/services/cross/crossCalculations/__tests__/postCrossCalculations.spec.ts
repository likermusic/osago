import { BASE_TIMEOUT } from 'constants/apiTimeout';

import { CROSS_CALCULATIONS_MOCK, mockAxiosPost, mockAxiosGet } from '../../../../../__mocks__';
import { postCrossCalculations } from '../crossCalculationsServices';

describe('WHEN "postCrossCalculations" is called', () => {
  const orderHash = 'orderHash';

  describe('AND "orderHash" was not provided', () => {
    it('MUST return empty list', async () => {
      expect(await postCrossCalculations('')).toBeNull();
    });

    it('MUST NOT do query to server', async () => {
      await postCrossCalculations('');

      expect(mockAxiosGet).not.toHaveBeenCalled();
    });
  });

  beforeAll(() => {
    mockAxiosPost.mockResolvedValue({ data: CROSS_CALCULATIONS_MOCK });
  });

  it('MUST do request to service', async () => {
    await postCrossCalculations(orderHash);

    expect(mockAxiosPost).toHaveBeenCalledWith(
      `<OSAGOGATEWAY>/v1/x/calculation`,
      { orderHash },
      { timeout: BASE_TIMEOUT },
    );
  });

  it('MUST start calculations and return info about cross calculations', async () => {
    expect(await postCrossCalculations(orderHash)).toEqual(CROSS_CALCULATIONS_MOCK);
  });
});
