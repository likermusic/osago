import type { COOKIES_API } from '../../generatedDTO';

declare namespace Cookies {
  type TUTMCookiesRequest = COOKIES_API['/v1/cookies']['post']['requestBody']['content']['application/json'];
  type TUTMCookiesResponse = COOKIES_API['/v1/cookies']['post']['responses']['200']['content']['application/json'];
}
