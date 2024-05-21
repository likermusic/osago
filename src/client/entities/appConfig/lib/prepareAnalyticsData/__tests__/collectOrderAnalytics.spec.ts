import { BFF_PROXY_API } from 'constants/apiRoutes';
import { mockAxiosGet } from 'mocks/helpers';

import { collectOrderAnalytics } from '../collectOrderAnalytics';

const mockCollectOrderAnalyticsFromCookies = jest.fn();
jest.mock('../collectOrderAnalyticsFromCookies', () => ({
  collectOrderAnalyticsFromCookies: jest
    .fn()
    .mockImplementation((...args: unknown[]) => mockCollectOrderAnalyticsFromCookies(...args)),
}));

const mockReadClientIdFromCookie = jest.fn();
const mockReadYandexClientIdFromCookieOrScript = jest.fn();
jest.mock('../readUtmId', () => ({
  readClientIdFromCookie: jest.fn().mockImplementation((...args: unknown[]) => mockReadClientIdFromCookie(...args)),
  readYandexClientIdFromCookieOrScript: jest
    .fn()
    .mockImplementation((...args: unknown[]) => mockReadYandexClientIdFromCookieOrScript(...args)),
}));

describe('WHEN "collectOrderAnalytics" is called', () => {
  const url = 'originalUrl';
  const getCookie = jest.fn();

  beforeEach(() => {
    mockCollectOrderAnalyticsFromCookies.mockReturnValue({
      utm: {},
    });

    mockAxiosGet.mockResolvedValue({});
  });

  it('MUST collect data from cookies', async () => {
    await collectOrderAnalytics(getCookie, url, false);

    expect(mockCollectOrderAnalyticsFromCookies).toHaveBeenCalledWith(getCookie);
  });

  it('MUST fill "uaClientId"', async () => {
    await collectOrderAnalytics(getCookie, url, false);

    expect(mockReadClientIdFromCookie).toHaveBeenCalledWith(getCookie);
  });

  it('MUST fill "ymClientId"', async () => {
    await collectOrderAnalytics(getCookie, url, false);

    expect(mockReadYandexClientIdFromCookieOrScript).toHaveBeenCalledWith(getCookie, false);
  });

  describe('AND "utmSource" was not provided', () => {
    it('MUST do request to server for utm cookies', async () => {
      await collectOrderAnalytics(getCookie, url, false);

      expect(mockAxiosGet).toHaveBeenCalledWith(BFF_PROXY_API.getUTMCookies, {
        params: { url },
      });
    });

    it('AND request was succeed, MUST try to parse response from server', async () => {
      mockAxiosGet.mockResolvedValue({
        data: {
          cookies: [
            {
              name: '__utmz',
              value:
                'utmccn%3d(not%20set)%7cutmcct%3d(not%20set)%7cutmcmd%3d(none)%7cutmcsr%3d(direct)%7cutmctr%3d(not%20set)',
              domain: '.stage.yandex.sravni-team.ru',
              path: '/',
              httpOnly: false,
              expires: null,
              secure: false,
              sameSite: null,
              maxAge: 15811200,
            },
            {
              name: '__utmx',
              value:
                'utmccn%3d(not%20set)%7cutmcct%3d(not%20set)%7cutmcmd%3d(none)%7cutmcsr%3d(direct)%7cutmctr%3d(not%20set)',
              domain: '.stage.yandex.sravni-team.ru',
              path: '/',
              httpOnly: false,
              expires: null,
              secure: false,
              sameSite: null,
              maxAge: 1800,
            },
          ],
        },
      });

      expect(await collectOrderAnalytics(getCookie, url, false)).toEqual({
        utm: {
          campaign: '(not set)',
          content: '(not set)',
          medium: '(none)',
          source: '(direct)',
          term: '(not set)',
        },
      });
    });
  });
});
