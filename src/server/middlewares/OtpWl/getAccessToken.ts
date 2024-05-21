export const getAccessToken = (authHeader: string | undefined, tokenType = 'Bearer') =>
  authHeader?.replace(`${tokenType} `, '') ?? '';
