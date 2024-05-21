export const mockSendSentryClientError = jest.fn();

jest.mock('shared/lib/sendSentryClientError/sendSentryClientError', () => ({
  sendSentryClientError: (...arg: unknown[]) => mockSendSentryClientError(...arg),
}));
