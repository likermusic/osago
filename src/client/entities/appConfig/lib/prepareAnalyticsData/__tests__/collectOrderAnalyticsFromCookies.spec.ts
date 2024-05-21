import { collectOrderAnalyticsFromCookies } from '../collectOrderAnalyticsFromCookies';

const mockReadPartnerCookie = jest.fn();
jest.mock('../readPartnerCookie', () => ({
  readPartnerCookie: jest.fn().mockImplementation((...args: unknown[]) => mockReadPartnerCookie(...args)),
}));

const mockPromotionCookie = jest.fn();
jest.mock('../readPromotionCookie', () => ({
  readPromotionCookie: jest.fn().mockImplementation((...args: unknown[]) => mockPromotionCookie(...args)),
}));

const mockReadUTMCookie = jest.fn();
jest.mock('../readUTMCookie', () => ({
  readUTMCookie: jest.fn().mockImplementation((...args: unknown[]) => mockReadUTMCookie(...args)),
}));

describe('WHEN "collectOrderAnalyticsFromCookies" is called', () => {
  const getCookieMock = jest.fn();

  beforeAll(() => {
    mockReadPartnerCookie.mockReturnValue({});
    mockPromotionCookie.mockReturnValue({});
    mockReadUTMCookie.mockReturnValue({});
  });

  it('MUST collect analytics data cookies', () => {
    expect(collectOrderAnalyticsFromCookies(getCookieMock)).toEqual({
      clid: undefined,
      partner: {},
      promotionQuery: {},
      utm: {},
    });

    expect(mockReadPartnerCookie).toHaveBeenCalled();
    expect(mockPromotionCookie).toHaveBeenCalled();
    expect(mockReadUTMCookie).toHaveBeenCalled();
  });
});
