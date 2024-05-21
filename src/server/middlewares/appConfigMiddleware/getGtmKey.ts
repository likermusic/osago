import { GTM_KEYS, MAP_PARTNERS_TO_GTM } from '../../../constants/partners';

import type { IAppConfig } from './types';

export const getGtmKey = (appType: IAppConfig['appType'], parentId?: number): IAppConfig['gtmKey'] => {
  if (appType === 'wl' && parentId) {
    return MAP_PARTNERS_TO_GTM[parentId] ?? GTM_KEYS.wl;
  }

  return GTM_KEYS['sravni.ru'];
};
