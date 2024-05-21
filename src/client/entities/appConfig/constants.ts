// Идентификаторы экспериментов которые проводятся на проекте

import type { TAppConfig } from './types';

export const PLATFORM_TYPES: Record<TAppConfig['appType'], string> = {
  'sravni.ru': 'OSAGO2',
  wl: 'WL',
};

export const COOKIE_DEFAULT_VALUE = '(not set)';
