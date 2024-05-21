import { AUTH_HEADER_MOCK, mockAxiosGet, TEST_ERROR } from '../../../../__mocks__';
import { getCalculationQueryBySearchId } from '../getCalculationQueryBySearchId';

describe('WHEN "getCalculationQueryBySearchId" is called', () => {
  const query = {
    id: 10,
    hash: 'hash',
  };

  beforeEach(() => {
    mockAxiosGet.mockResolvedValue({ data: {} });
  });

  it('MUST do request to "OSAGOGATEWAY" service', async () => {
    await getCalculationQueryBySearchId(query);

    expect(mockAxiosGet).toHaveBeenCalledWith(
      `<OSAGOGATEWAY>/v1/queries/id/${query.id}/hash/${query.hash}`,
      AUTH_HEADER_MOCK,
    );
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
      expect(await getCalculationQueryBySearchId(query)).toEqual({
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
      await getCalculationQueryBySearchId(query);
    } catch (e) {
      error = e;
    }

    expect(error).toEqual(TEST_ERROR);
  });
});
