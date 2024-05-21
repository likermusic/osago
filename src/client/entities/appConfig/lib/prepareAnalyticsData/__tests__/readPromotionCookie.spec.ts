import { COOKIE_DEFAULT_VALUE } from '../../../constants';
import { readPromotionCookie } from '../readPromotionCookie';

describe('WHEN "readPromotionCookie" is called', () => {
  it('AND cookie was not provided, MUST return default data set', () => {
    expect(readPromotionCookie(undefined)).toEqual({
      campaign: '',
      category: '',
      source: '',
      sub1: '',
      sub2: '',
    });
  });

  it('AND cookie was  provided, MUST return full filled data set', () => {
    expect(
      readPromotionCookie(
        'int_campaign%3d(not%20set)%7cint_source%3d(not%20set)%7cint_medium%3d(none)%7cint_content%3d(direct)%7cint_term%3d(not%20set)',
      ),
    ).toEqual({
      campaign: COOKIE_DEFAULT_VALUE,
      category: '(none)',
      source: COOKIE_DEFAULT_VALUE,
      sub1: '(direct)',
      sub2: COOKIE_DEFAULT_VALUE,
    });
  });
});
