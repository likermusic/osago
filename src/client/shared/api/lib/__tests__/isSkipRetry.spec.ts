import { NO_RETRY_STATUSES } from 'constants/retryStatuses';

import { isSkipRetry } from 'shared/api/lib';

describe('WHEN "isSkipRetry" is called', () => {
  it.each(NO_RETRY_STATUSES.map((code) => [code]))('AND status is equal %p, MUST return true', (code) => {
    expect(isSkipRetry(code)).toBeTruthy();
  });
});
