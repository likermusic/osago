import { RETRY_AUTH_STATUSES, NO_RETRY_STATUSES } from '../../../constants/retryStatuses';

export const MAX_RETRY_COUNT = 3;

export const checkRetryAuthCodes = (retryCount: number, status: number) =>
  RETRY_AUTH_STATUSES.includes(status) && retryCount < MAX_RETRY_COUNT;

export const checkRetryCommonCodes = (retryCount: number, status: number) =>
  !NO_RETRY_STATUSES.includes(status) && retryCount < MAX_RETRY_COUNT;

export const checkRetryAuthAndCommonCodes = (retryCount: number, status: number) =>
  checkRetryAuthCodes(retryCount, status) || checkRetryCommonCodes(retryCount, status);
