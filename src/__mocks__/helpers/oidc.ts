const mockGetSilentSignInVerifyUrl = jest.fn();
const mockGetSilentSignInUrl = jest.fn();

mockGetSilentSignInVerifyUrl.mockReturnValue('/openid/v2/silent/signin/verify/');
mockGetSilentSignInUrl.mockReturnValue('/openid/v2/silent/signin/verify/');

export { mockGetSilentSignInVerifyUrl, mockGetSilentSignInUrl };
