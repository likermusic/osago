import { BFF_PROXY_API } from 'constants/apiRoutes';
import { mockAxiosPost } from 'mocks/helpers';

import { sendUtmNotFound } from '../sendUtmNotFound';

describe('WHEN "sendUtmNotFound" is called', () => {
  const url = 'originalUrl';

  it('MUST send query to bff with provided label', async () => {
    document.cookie = 'test';
    await sendUtmNotFound(url, 'ANALYTIC_UTM_NOT_FOUND');

    expect(mockAxiosPost).toHaveBeenCalledWith(BFF_PROXY_API.log, {
      info: { cookie: 'test', originalUrl: 'originalUrl' },
      message: 'ANALYTIC_UTM_NOT_FOUND',
    });
  });
});
