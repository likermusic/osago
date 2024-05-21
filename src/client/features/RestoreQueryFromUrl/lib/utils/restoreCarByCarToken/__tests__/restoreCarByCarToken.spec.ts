import { BFF_PROXY_API } from 'constants/apiRoutes';
import { CAR_INFO_PREFILLED_MOCK, mockAxiosPost, TEST_ERROR } from 'mocks/index';

import { restoreCarByCarToken } from '../restoreCarByCarToken';

describe('WHEN "restoreCarByCarToken" is called', () => {
  const response = CAR_INFO_PREFILLED_MOCK;

  beforeEach(() => {
    mockAxiosPost.mockResolvedValue({ data: response });
  });

  it('MUST do request to bff', async () => {
    await restoreCarByCarToken('test');

    expect(mockAxiosPost).toHaveBeenCalledWith(BFF_PROXY_API.getRegNumberTokenInfo, {
      carNumberToken: 'test',
    });
  });

  it('AND request was success, MUST provided data from bff to client', async () => {
    expect(await restoreCarByCarToken('test')).toEqual(response);
  });

  it('AND request was failure, MUST return null', async () => {
    mockAxiosPost.mockRejectedValue(TEST_ERROR);

    expect(await restoreCarByCarToken('test')).toBeNull();
  });
});
