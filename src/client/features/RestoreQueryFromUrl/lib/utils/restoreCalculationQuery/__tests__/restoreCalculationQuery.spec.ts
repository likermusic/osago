import { BFF_PROXY_API } from 'constants/apiRoutes';
import { mockAxiosGet, TEST_ERROR } from 'mocks/index';

import type { RestoreCalculationQuery } from '../restoreCalculationQuery';
import { restoreCalculationQuery } from '../restoreCalculationQuery';

describe('WHEN "restoreDataByCalculationHash" is called', () => {
  const query: RestoreCalculationQuery = {
    calculationHash: 'calculationHash',
    hash: 'hash',
    orderHash: 'orderHash',
    searchId: 'searchId',
  };

  const response = {
    someData: {},
  };

  beforeEach(() => {
    mockAxiosGet.mockResolvedValue({
      data: response,
    });
  });

  it('MUST do request to bff', async () => {
    await restoreCalculationQuery(query);

    expect(mockAxiosGet).toHaveBeenCalledWith(BFF_PROXY_API.restoreCalculationQuery, {
      params: query,
    });
  });

  it('AND request was success, MUST provided data from bff to client', async () => {
    expect(await restoreCalculationQuery(query)).toEqual(response);
  });

  it('AND request was failure, MUST provided error from bff to client', async () => {
    let error: Nullable<Error> = null;
    mockAxiosGet.mockRejectedValue(TEST_ERROR);

    try {
      await restoreCalculationQuery(query);
    } catch (e) {
      error = e;
    }

    expect(error).toEqual(TEST_ERROR);
  });
});
