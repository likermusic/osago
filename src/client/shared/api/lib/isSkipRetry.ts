import { NO_RETRY_STATUSES } from 'constants/retryStatuses';

export const isSkipRetry = (status?: string | number) => NO_RETRY_STATUSES.includes(parseInt(String(status), 10));
