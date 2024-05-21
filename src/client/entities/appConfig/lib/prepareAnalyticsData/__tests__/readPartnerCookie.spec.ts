import { readPartnerCookie } from '../readPartnerCookie';

describe('WHEN "readPartnerCookie" is called', () => {
  it('AND cookie was not provided? MUST return default set', () => {
    expect(readPartnerCookie(undefined)).toEqual({});
  });

  it('AND cookie was provided? MUST return full filled set', () => {
    const cookie = [
      'aff_id',
      'aff_sub',
      'aff_sub2',
      'aff_sub3',
      'aff_sub4',
      'aff_sub5',
      'uc',
      'um',
      'p_offer_id',
      'us',
      'source',
      'sid',
      'tid',
    ]
      .map((key) => `${key}=${key}`)
      .join('&');

    expect(readPartnerCookie(cookie)).toEqual({
      affSub1: 'aff_sub',
      affSub2: 'aff_sub2',
      affSub3: 'aff_sub3',
      affSub4: 'aff_sub4',
      affSub5: 'aff_sub5',
      campaign: 'uc',
      medium: 'um',
      source: 'us',
      sourceId: 'source',
      subId: 'sid',
      transactionId: 'tid',
    });
  });
});
