export const mapCookieToCookiesService = (getCookie: (name: string) => string, cookieNames: string[]) =>
  cookieNames.map((cookieName) => ({
    key: cookieName,
    value: getCookie(cookieName),
  }));
