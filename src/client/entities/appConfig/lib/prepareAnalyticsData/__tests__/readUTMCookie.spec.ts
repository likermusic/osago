import { COOKIE_DEFAULT_VALUE } from '../../../constants';
import { readUTMCookie } from '../readUTMCookie';

describe('WHEN "readUTMCookie" is called', () => {
  it('AND cookie was not provided, MUST return default utm data', () => {
    expect(readUTMCookie(undefined)).toEqual({
      campaign: undefined,
      content: undefined,
      medium: undefined,
      source: undefined,
      term: undefined,
    });
  });

  it('AND cookie was provided, MUST return full filled utm data', () => {
    expect(
      readUTMCookie(
        'utmccn%3d(not%20set)%7cutmcct%3d(not%20set)%7cutmcmd%3d(none)%7cutmcsr%3d(direct)%7cutmctr%3d(not%20set)',
      ),
    ).toEqual({
      campaign: COOKIE_DEFAULT_VALUE,
      content: COOKIE_DEFAULT_VALUE,
      medium: '(none)',
      source: '(direct)',
      term: COOKIE_DEFAULT_VALUE,
    });
  });
});
