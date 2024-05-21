import { BASE_TIMEOUT } from 'constants/apiTimeout';
import { mockAxiosGet } from 'mocks/helpers';

import { getMarketingInfo } from '../marketing';

const GET_MARKETING_INFO_MOCK = {
  info: '',
};

describe('WHEN "getMarketingInfo" is called', () => {
  it('MUST do request to OSAGOGATEWAY service', async () => {
    await getMarketingInfo();

    expect(mockAxiosGet).toHaveBeenCalledWith(`<OSAGOGATEWAY>/v1/events/marketing`, { timeout: BASE_TIMEOUT });
  });

  beforeAll(() => {
    mockAxiosGet.mockResolvedValue({ data: GET_MARKETING_INFO_MOCK });
  });

  it('MUST return result of request', async () => {
    expect(await getMarketingInfo()).toEqual(GET_MARKETING_INFO_MOCK);
  });
});
