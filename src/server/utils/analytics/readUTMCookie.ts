import { parseUTMCookie } from '@sravni/utils/lib/analytics';

import { COOKIE_NAMES } from '../../../constants/cookiesNames';

import { mapUTM } from './mapUTM';
import type { OsagoUtmQuery } from './types';

export const readUTMCookie = (getCookie: (cookieName: string) => string | undefined): OsagoUtmQuery =>
  mapUTM(parseUTMCookie(getCookie(COOKIE_NAMES.utm) ?? ''));
