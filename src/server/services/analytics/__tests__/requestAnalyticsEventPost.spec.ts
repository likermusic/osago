import { BASE_TIMEOUT } from 'constants/apiTimeout';
import { mockAxiosPost, TEST_ERROR } from 'mocks/helpers';

import { requestAnalyticsEventPost } from '../requestAnalyticsEventPost';

describe('WHEN "requestAnalyticsEventPost" is called', () => {
  it('MUST do post request to osago gateway service', async () => {
    await requestAnalyticsEventPost({ eventName: 'test event' });

    expect(mockAxiosPost).toHaveBeenCalledWith(
      '<OSAGOGATEWAY>/v1/events',
      {
        eventName: 'test event',
        userAgent: undefined,
        userToken: undefined,
      },
      { timeout: BASE_TIMEOUT },
    );
  });

  it('AND request is succeed, MUST return true', async () => {
    mockAxiosPost.mockResolvedValue({
      data: true,
    });

    expect(await requestAnalyticsEventPost({ eventName: 'test event' })).toBeTruthy();
  });

  it('AND request is failure, MUST throw exception error', async () => {
    mockAxiosPost.mockRejectedValue(TEST_ERROR);

    let error: Nullable<Error> = null;
    try {
      await requestAnalyticsEventPost({ eventName: 'test event' });
    } catch (e) {
      error = e;
    }

    expect(error).toEqual(TEST_ERROR);
  });
});
