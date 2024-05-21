import { readYandexClientIdFromCookieOrScript } from '../readUtmId';

describe('WHEN "readYandexClientIdFromCookieOrScript" is called', () => {
  const testId = 'testId';

  it('MUST try to get id from cookies', () => {
    expect(readYandexClientIdFromCookieOrScript(() => testId, false)).toEqual(testId);
  });

  describe('AND cookies does not contains yaId', () => {
    const wlTestId = 'wlTestId';
    const nonWlTestId = 'nonWlTestId';
    window.yaCounter87750877 = {
      getClientID: () => wlTestId,
    };

    window.yaCounter159737 = {
      getClientID: () => nonWlTestId,
    };

    it('AND it is WL, MUST try to get data from wl counter', () => {
      expect(readYandexClientIdFromCookieOrScript(() => '', true)).toEqual(wlTestId);
    });

    it('AND it is not WL, MUST try to get data from non wl counter', () => {
      expect(readYandexClientIdFromCookieOrScript(() => '', false)).toEqual(nonWlTestId);
    });
  });
});
