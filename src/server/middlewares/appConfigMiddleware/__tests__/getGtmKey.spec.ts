import { GTM_KEYS, PARTNERS_IDS } from '../../../../constants/partners';
import { getGtmKey } from '../getGtmKey';
import type { IAppConfig } from '../types';

describe('WHEN "getGtmKey" is called', () => {
  it.each([
    ['sravni.ru', 1234, GTM_KEYS['sravni.ru']],
    ['wl', 1, GTM_KEYS.wl],
    ['wl', PARTNERS_IDS.twiga, GTM_KEYS.twiga],
    ['wl', PARTNERS_IDS.beeline, GTM_KEYS.beeline],
    ['wl', PARTNERS_IDS.sberAuto, GTM_KEYS.sberAuto],
    ['wl', PARTNERS_IDS.eldorado, GTM_KEYS.eldorado],
  ])('AND appType is %p partnerId is %p, MUST return %p', (appType: string, partnerId: number, result: string) => {
    expect(getGtmKey(appType as IAppConfig['appType'], partnerId)).toEqual(result);
  });
});
