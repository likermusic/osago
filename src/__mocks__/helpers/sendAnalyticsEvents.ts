const mockedSendAnalytics = jest.fn();

jest.mock('shared/lib/sendAnalyticsEvents', () => ({
  useGetSendAnalytics: jest.fn().mockReturnValue((...args: unknown[]) => mockedSendAnalytics(...args)),
}));

export { mockedSendAnalytics };
