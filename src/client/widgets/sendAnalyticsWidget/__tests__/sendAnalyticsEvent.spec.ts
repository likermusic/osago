import { BFF_PROXY_API } from 'constants/apiRoutes';
import { mockAxiosPost } from 'mocks/helpers';

import { sendAnalyticsEvent } from '../lib/sendAnalyticsEvent';

describe('WHEN "sendAnalyticsEvent" is called', () => {
  it('MUST do request to bff', async () => {
    await sendAnalyticsEvent({ eventName: 'osago_landing' });

    expect(mockAxiosPost).toHaveBeenCalledWith(BFF_PROXY_API.sendAnalyticsEvent, { eventName: 'osago_landing' });
  });
});
