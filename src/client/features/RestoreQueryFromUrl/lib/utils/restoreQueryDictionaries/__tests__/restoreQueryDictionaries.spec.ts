import { BFF_PROXY_API } from 'constants/apiRoutes';
import { mockAxiosGet, TEST_ERROR } from 'mocks/index';

import { restoreQueryDictionaries } from '../restoreQueryDictionaries';

describe('WHEN "restoreQueryDictionaries" is called', () => {
  const query = {
    enginePower: 10,
    year: 2023,
    modelId: 84,
    brandId: 51,
  };

  const response = {
    someData: {},
  };

  beforeEach(() => {
    mockAxiosGet.mockResolvedValue({ data: response });
  });

  it('MUST do request to bff', async () => {
    await restoreQueryDictionaries(query);

    expect(mockAxiosGet).toHaveBeenCalledWith(BFF_PROXY_API.getCarInfoDictionaries, {
      params: query,
    });
  });

  it('AND request was success, MUST provided data from bff to client', async () => {
    expect(await restoreQueryDictionaries(query)).toEqual(response);
  });

  it('AND request was failure, MUST provided error from bff to client', async () => {
    let error: Nullable<Error> = null;
    mockAxiosGet.mockRejectedValue(TEST_ERROR);

    try {
      await restoreQueryDictionaries(query);
    } catch (e) {
      error = e;
    }

    expect(error).toEqual(TEST_ERROR);
  });
});
