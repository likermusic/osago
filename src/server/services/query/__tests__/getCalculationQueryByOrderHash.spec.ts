import { AUTH_HEADER_MOCK, mockAxiosGet, TEST_ERROR } from '../../../../__mocks__';
import { getCalculationQueryByOrderHash } from '../getCalculationQueryByOrderHash';

describe('WHEN "getCalculationQueryByOrderHash" is called', () => {
  const orderHash = '1234';

  beforeEach(() => {
    mockAxiosGet.mockResolvedValue({ data: {} });
  });

  it('MUST do request to "OSAGOGATEWAY" service', async () => {
    await getCalculationQueryByOrderHash({ orderHash });

    expect(mockAxiosGet).toHaveBeenCalledWith(`<OSAGOGATEWAY>/v1/queries/orderHash/${orderHash}`, AUTH_HEADER_MOCK);
  });

  describe('AND request is success', () => {
    const data = {
      brandId: 22,
      year: 2022,
      modelId: 33,
      modification: 33,
      enginePower: 12,
      engineSp: 44,
    };

    beforeEach(() => {
      mockAxiosGet.mockResolvedValue({ data });
    });

    it('MUST return data with query and dictionary', async () => {
      expect(await getCalculationQueryByOrderHash({ orderHash })).toEqual({
        brandId: 22,
        engineSp: 44,
        modelId: 33,
        vehicleCategory: undefined,
        year: 2022,
        modification: 33,
        enginePower: 12,
      });
    });
  });

  it('AND request failed, MUST throw error', async () => {
    let error: Nullable<Error> = null;
    mockAxiosGet.mockRejectedValue(TEST_ERROR);

    try {
      await getCalculationQueryByOrderHash({ orderHash });
    } catch (e) {
      error = e;
    }

    expect(error).toEqual(TEST_ERROR);
  });
});
