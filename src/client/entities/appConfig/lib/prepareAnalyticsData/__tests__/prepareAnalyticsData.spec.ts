import Cookies from 'js-cookie';

import { BFF_PROXY_API } from 'constants/apiRoutes';
import { mockAxiosPost } from 'mocks/helpers';

import type { TAnalytics, OsagoPartnerQuery } from '../../../types';
import { prepareAnalyticsData } from '../prepareAnalyticsData';

const mockCollectOrderAnalytics = jest.fn();
jest.mock('../collectOrderAnalytics', () => ({
  collectOrderAnalytics: jest.fn().mockImplementation((...args: unknown[]) => mockCollectOrderAnalytics(...args)),
}));

const mockReadClientIdFromCookie = jest.fn();
const mockReadYandexClientIdFromCookieOrScript = jest.fn();
jest.mock('../readUtmId', () => ({
  readClientIdFromCookie: jest.fn().mockImplementation((...args: unknown[]) => mockReadClientIdFromCookie(...args)),
  readYandexClientIdFromCookieOrScript: jest
    .fn()
    .mockImplementation((...args: unknown[]) => mockReadYandexClientIdFromCookieOrScript(...args)),
}));

describe('WHEN "prepareAnalyticsData" is called', () => {
  const baseAnalytics = {
    utm: {},
    partner: {},
    promotionQuery: {},
    clid: 'string',
  } as unknown as TAnalytics['base'];
  const originalUrl = 'test-url';
  const wlData = { test: 'test-wl-data' } as OsagoPartnerQuery;
  const testUaClientId = 'uaClientId';
  const testYmClientId = 'ymClientId';

  beforeAll(() => {
    mockReadClientIdFromCookie.mockReturnValue(testUaClientId);
    mockReadYandexClientIdFromCookieOrScript.mockReturnValue(testYmClientId);
  });

  describe('AND it is wl page', () => {
    const isWL = true;
    it('AND it is non partner Wl, MUST collect data from cookies', async () => {
      await prepareAnalyticsData({
        isNonPartnerWl: true,
        isWL,
        wl: wlData,
        originalUrl,
        base: null,
      });

      expect(mockCollectOrderAnalytics).toHaveBeenCalledWith(Cookies.get, originalUrl, isWL, false);
    });

    describe('AND it is partner Wl', () => {
      it('MUST NOT call "collectOrderAnalytics"', async () => {
        await prepareAnalyticsData({
          isNonPartnerWl: false,
          isWL,
          wl: wlData,
          originalUrl,
          base: baseAnalytics,
        });

        expect(mockCollectOrderAnalytics).not.toHaveBeenCalled();
      });

      it('MUST return WL as a partner', async () => {
        expect(
          await prepareAnalyticsData({
            isNonPartnerWl: false,
            isWL,
            wl: wlData,
            originalUrl,
            base: baseAnalytics,
          }),
        ).toEqual({ partner: wlData });
      });
    });
  });

  describe('AND it is not WL page', () => {
    it('AND base analytics utm was not provided, MUST collect data from cookies', async () => {
      await prepareAnalyticsData({
        isNonPartnerWl: true,
        isWL: false,
        wl: wlData,
        originalUrl,
        base: null,
      });

      expect(mockCollectOrderAnalytics).toHaveBeenCalledWith(Cookies.get, originalUrl, false, false);
    });

    describe('AND base analytics utm was provided', () => {
      describe('AND log is provided', () => {
        it('AND "uaClientId" is not provided, MUST send error log error', async () => {
          await prepareAnalyticsData({
            isNonPartnerWl: true,
            isWL: false,
            wl: wlData,
            originalUrl,
            base: baseAnalytics,
            logAnalytics: true,
          });

          expect(mockAxiosPost).toHaveBeenCalledWith(BFF_PROXY_API.log, {
            info: { cookie: '', originalUrl: 'test-url' },
            message: 'ANALYTIC_UA_CLIENT_ID_NOT_FOUND_IN_BASE',
          });
        });

        it('AND "ymClientId" is not provided, MUST send error log error', async () => {
          await prepareAnalyticsData({
            isNonPartnerWl: true,
            isWL: false,
            wl: wlData,
            originalUrl,
            base: baseAnalytics,
            logAnalytics: true,
          });

          expect(mockAxiosPost).toHaveBeenCalledWith(BFF_PROXY_API.log, {
            info: { cookie: '', originalUrl: 'test-url' },
            message: 'ANALYTIC_YM_CLIENT_ID_NOT_FOUND_IN_BASE',
          });
        });
      });

      it('AND "uaClientId" is not provided, MUST return data with uaClientId from cookies', async () => {
        mockReadClientIdFromCookie.mockReturnValue(testUaClientId);
        expect(
          await prepareAnalyticsData({
            isNonPartnerWl: true,
            isWL: false,
            wl: wlData,
            originalUrl,
            base: null,
            logAnalytics: true,
          }),
        ).toEqual(undefined);
      });

      it('AND "ymClientId" is not provided, MUST return data with ymClientId from cookies', async () => {
        expect(
          await prepareAnalyticsData({
            isNonPartnerWl: true,
            isWL: false,
            wl: wlData,
            originalUrl,
            base: {
              ...baseAnalytics,
              utm: {
                uaClientId: testUaClientId,
              },
            } as TAnalytics['base'],
            logAnalytics: true,
          }),
        ).toEqual({
          utm: { ymClientId: testYmClientId, uaClientId: testUaClientId },
          clid: 'string',
          partner: {},
          promotionQuery: {},
        });
      });
    });
  });
});
