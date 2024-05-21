import { subDays } from 'date-fns';

import { COOKIE_NAMES } from '../../../constants/cookiesNames';
import setUtmDateCookies from '../setUtmDateCookies';

export function generateCookiesContext<Data extends Record<string, string | undefined>>(cookies: Data) {
  return {
    cookies: {
      _cookies: cookies,
      get(key: string) {
        return this._cookies[key];
      },
      set: jest.fn(),
    },
  } as unknown as App.ExtendedContext;
}

describe('WHEN "setUtmDateCookies" is called', () => {
  const next = jest.fn();
  const contextCookies = {
    [COOKIE_NAMES.utm]: '123',
    [COOKIE_NAMES.previousUtm]: '123',
    [COOKIE_NAMES.utmSetDate]: '345',
    [COOKIE_NAMES.partner]: '567',
    [COOKIE_NAMES.previousPartner]: '567',
    [COOKIE_NAMES.partnerSetDate]: '789',
  };

  it('AND request comes without clean cookies, MUST continue without update cookies', async () => {
    const context = generateCookiesContext({});
    await setUtmDateCookies(context, next);

    expect(context.cookies.set).toBeCalledTimes(0);
    expect(next).toHaveBeenCalled();
  });

  describe('AND request context contains cookies utmz, partner, utmzSetDate, partnerSetDate', () => {
    it('AND previous cookies are the same with main, MUST do nothing', async () => {
      const context = generateCookiesContext(contextCookies);
      await setUtmDateCookies(context, next);

      expect(context.cookies.set).toBeCalledTimes(0);
      expect(next).toHaveBeenCalled();
    });

    it('AND previous cookies are not exist, MUST set previous cookies', async () => {
      const context = generateCookiesContext({
        ...contextCookies,
        [COOKIE_NAMES.previousUtm]: undefined,
        [COOKIE_NAMES.previousPartner]: undefined,
      });
      await setUtmDateCookies(context, next);

      expect(context.cookies.set).toHaveBeenCalledWith(COOKIE_NAMES.previousUtm, '123', { httpOnly: false });
      expect(context.cookies.set).toHaveBeenCalledWith(COOKIE_NAMES.previousPartner, '567', { httpOnly: false });
      expect(next).toHaveBeenCalled();
    });

    describe('AND previous cookies different with main cookies', () => {
      it('MUST set previous cookies and partnerSetDate', async () => {
        const context = generateCookiesContext({
          ...contextCookies,
          [COOKIE_NAMES.previousUtm]: '321',
          [COOKIE_NAMES.previousPartner]: '765',
        });
        const mockDate = new Date().toISOString();
        const spy = jest.spyOn(Date.prototype, 'toISOString').mockReturnValue(mockDate);
        await setUtmDateCookies(context, next);

        expect(context.cookies.set).toHaveBeenCalledWith(COOKIE_NAMES.previousUtm, '123', { httpOnly: false });
        expect(context.cookies.set).toHaveBeenCalledWith(COOKIE_NAMES.partnerSetDate, mockDate, { httpOnly: false });
        expect(context.cookies.set).toHaveBeenCalledWith(COOKIE_NAMES.previousPartner, '567', { httpOnly: false });
        expect(next).toHaveBeenCalled();
        spy.mockReset();
      });

      it('AND utmzSetDate more than 30 days, MUST set previous cookies, utmzSetDate and partnerSetDate', async () => {
        const context = generateCookiesContext({
          ...contextCookies,
          [COOKIE_NAMES.previousUtm]: '321',
          [COOKIE_NAMES.previousPartner]: '765',
          [COOKIE_NAMES.utmSetDate]: subDays(new Date(), 31).toISOString(),
        });
        const mockDate = new Date().toISOString();
        const spy = jest.spyOn(Date.prototype, 'toISOString').mockReturnValue(mockDate);
        await setUtmDateCookies(context, next);

        expect(context.cookies.set).toHaveBeenCalledWith(COOKIE_NAMES.utmSetDate, mockDate, { httpOnly: false });
        expect(context.cookies.set).toHaveBeenCalledWith(COOKIE_NAMES.previousUtm, '123', { httpOnly: false });
        expect(context.cookies.set).toHaveBeenCalledWith(COOKIE_NAMES.partnerSetDate, mockDate, { httpOnly: false });
        expect(context.cookies.set).toHaveBeenCalledWith(COOKIE_NAMES.previousPartner, '567', { httpOnly: false });
        expect(next).toHaveBeenCalled();
        spy.mockReset();
      });

      it.each([29, 30])(
        'AND utmzSetDate less than 30 days or equal, MUST set previous cookies and partnerSetDate',
        async (days) => {
          const context = generateCookiesContext({
            ...contextCookies,
            [COOKIE_NAMES.previousUtm]: '321',
            [COOKIE_NAMES.previousPartner]: '765',
            [COOKIE_NAMES.utmSetDate]: subDays(new Date(), days).toISOString(),
          });
          const mockDate = new Date().toISOString();
          const spy = jest.spyOn(Date.prototype, 'toISOString').mockReturnValue(mockDate);
          await setUtmDateCookies(context, next);

          expect(context.cookies.set).toHaveBeenCalledWith(COOKIE_NAMES.previousUtm, '123', { httpOnly: false });
          expect(context.cookies.set).toHaveBeenCalledWith(COOKIE_NAMES.partnerSetDate, mockDate, { httpOnly: false });
          expect(context.cookies.set).toHaveBeenCalledWith(COOKIE_NAMES.previousPartner, '567', { httpOnly: false });
          expect(next).toHaveBeenCalled();
          spy.mockReset();
        },
      );
    });
  });

  it('AND cookies utmz, partner are exist, but utmzSetDate and partnerSetDate is not exist, MUST set cookies utmzSetDate and partnerSetDate with current date', async () => {
    const context = generateCookiesContext({
      ...contextCookies,
      [COOKIE_NAMES.utmSetDate]: undefined,
      [COOKIE_NAMES.partnerSetDate]: undefined,
    });
    const mockDate = '2000-01-01T00:00:00.000Z';
    jest.spyOn(Date.prototype, 'toISOString').mockReturnValue(mockDate);
    await setUtmDateCookies(context, next);

    expect(context.cookies.set).toHaveBeenCalledWith(COOKIE_NAMES.utmSetDate, mockDate, { httpOnly: false });
    expect(context.cookies.set).toHaveBeenCalledWith(COOKIE_NAMES.partnerSetDate, mockDate, { httpOnly: false });
    expect(next).toHaveBeenCalled();
  });
});
