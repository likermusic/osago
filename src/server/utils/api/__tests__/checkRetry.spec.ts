import {
  checkRetryAuthAndCommonCodes,
  checkRetryAuthCodes,
  checkRetryCommonCodes,
  MAX_RETRY_COUNT,
} from '../checkRetry';

describe('WHEN "checkRetryAuthCodes" is called', () => {
  describe('AND status contains in "RETRY_AUTH_STATUSES"', () => {
    it('AND quantity of retries was reached, MUST return "false" ', () => {
      expect(checkRetryAuthCodes(MAX_RETRY_COUNT + 1, 401)).toBeFalsy();
    });

    it('AND quantity of retries was not reached, MUST return "true" ', () => {
      expect(checkRetryAuthCodes(MAX_RETRY_COUNT - 1, 401)).toBeTruthy();
    });
  });
});

describe('WHEN "checkRetryCommonCodes" is called', () => {
  describe('AND status not contains in "NO_RETRY_STATUSES"', () => {
    it('AND quantity of retries was reached, MUST return "false" ', () => {
      expect(checkRetryCommonCodes(MAX_RETRY_COUNT + 1, 500)).toBeFalsy();
    });

    it('AND quantity of retries was not reached, MUST return "true" ', () => {
      expect(checkRetryCommonCodes(MAX_RETRY_COUNT - 1, 500)).toBeTruthy();
    });
  });
});

describe('WHEN "checkRetryCommonCodes" is called', () => {
  describe('AND status contains in "NO_RETRY_STATUSES"', () => {
    it('AND quantity of retries was reached, MUST return "false" ', () => {
      expect(checkRetryCommonCodes(MAX_RETRY_COUNT + 1, 400)).toBeFalsy();
    });

    it('AND quantity of retries was not reached, MUST return "false" ', () => {
      expect(checkRetryCommonCodes(MAX_RETRY_COUNT - 1, 400)).toBeFalsy();
    });
  });
});

describe('WHEN "checkRetryAuthAndCommonCodes" is called', () => {
  describe('AND status contains in "RETRY_AUTH_STATUSES"', () => {
    it('AND quantity of retries was reached, MUST return "false" ', () => {
      expect(checkRetryAuthAndCommonCodes(MAX_RETRY_COUNT + 1, 401)).toBeFalsy();
    });

    it('AND quantity of retries was not reached, MUST return "true" ', () => {
      expect(checkRetryAuthAndCommonCodes(MAX_RETRY_COUNT - 1, 401)).toBeTruthy();
    });
  });

  describe('AND status not contains in "NO_RETRY_STATUSES"', () => {
    it('AND quantity of retries was reached, MUST return "false" ', () => {
      expect(checkRetryAuthAndCommonCodes(MAX_RETRY_COUNT + 1, 500)).toBeFalsy();
    });

    it('AND quantity of retries was not reached, MUST return "true" ', () => {
      expect(checkRetryAuthAndCommonCodes(MAX_RETRY_COUNT - 1, 500)).toBeTruthy();
    });
  });

  describe('AND status contains in "NO_RETRY_STATUSES"', () => {
    it('AND quantity of retries was reached, MUST return "false" ', () => {
      expect(checkRetryAuthAndCommonCodes(MAX_RETRY_COUNT + 1, 400)).toBeFalsy();
    });

    it('AND quantity of retries was not reached, MUST return "false" ', () => {
      expect(checkRetryAuthAndCommonCodes(MAX_RETRY_COUNT - 1, 400)).toBeFalsy();
    });
  });
});
