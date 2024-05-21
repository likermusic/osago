import { parseUTMCookie } from '@sravni/utils/lib/analytics';

type TParsedUTM = {
  campaign: string;
  content: string;
  medium: string;
  source: string;
  term: string;
  uaClientId: string;
  ymClientId: string;
  setDate: string;
};
export const readUTMCookie = (cookieValue?: string, cookieSetDate?: string): Partial<TParsedUTM> => {
  const parsedUTMCookie = parseUTMCookie(cookieValue || '');

  if (!parsedUTMCookie) return {};

  return {
    campaign: parsedUTMCookie.utmccn,
    content: parsedUTMCookie.utmcct,
    medium: parsedUTMCookie.utmcmd,
    source: parsedUTMCookie.utmcsr,
    term: parsedUTMCookie.utmctr,
    setDate: cookieSetDate,
  };
};
