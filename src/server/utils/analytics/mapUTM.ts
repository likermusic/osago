import type { parseUTMCookie } from '@sravni/utils/lib/analytics';

import type { OsagoUtmQuery } from './types';

export const mapUTM = (parsedUTMCookie: ReturnType<typeof parseUTMCookie>): OsagoUtmQuery => ({
  campaign: parsedUTMCookie.utmccn,
  content: parsedUTMCookie.utmcct,
  medium: parsedUTMCookie.utmcmd,
  source: parsedUTMCookie.utmcsr,
  term: parsedUTMCookie.utmctr,
});
