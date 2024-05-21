/**
 * fix TextEncoder is not defined error
 * https://stackoverflow.com/a/72369912
 * @jest-environment node
 */
import { TextEncoder, TextDecoder } from 'util';

import { FULL_OTP_USER_DATA, JWE } from 'mocks/OtpUserData';

import { decryptSignedJwtPayload } from '../decryptSignedJwtPayload';

const pkcs8PrivateKey =
  '-----BEGIN PRIVATE KEY-----\n' +
  'MIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQC0Lb0l+zjraZcN\n' +
  'UepvxvTzW1bT4Spwd+eC7k9akxshOar084GQkDWAGnKLBgUZfeCxoKCAN5ZOfHdb\n' +
  '5gVFCKXlmOnsNE4ej7MydGCU8UwaA1ogXHWwN2Xa6xM8bSXwwOS4tKxvpgZN4JK7\n' +
  'VnDFrFBMWuf+JJVeQPElOWpc1MtbvPDAofoYT5in6rOBImELYg1DJY7/iKw6Bd0n\n' +
  'j77Vi/9sBrEWXVsl+pPVVLig5TEkYjRBy7nmU1FVblWrOqA7+p/gIL8nPd8vV+JT\n' +
  'mxmuGkbVRefsL9SvrrvJrCJGLDr9AoAEIO5xGDeeZE0EkxtsMS1mWKPxYOzyKSAm\n' +
  'oJ2uwGTzAgMBAAECggEBAJJ/VfmZx+/wzHZyEjGMDQIJVBG2VDFZ7IzSgwbb8QUU\n' +
  'xGGh08jc2AMufc93t5HAfX8vYRCfIcDzBoFcBxDYNTr3F8uLw7CpmkP9x8GSaBQG\n' +
  'gbMqOi5q/JAA7oUFIgIcdFuR21p0HVAYtnVHlS3EKw3KJDLJQAGAwBFKG6cbBbWy\n' +
  'Dgu6roq/wOYIP1jJGHjopN8WyZG0Iiyb0Nr0JUpIyyKm7gRtBTmmNhkPkVQhD4h1\n' +
  'LUmPrbj98Wm8hRF4GV7/NdraOZoObUR99VI6S+GiXi5RMiWijvVavM6zHfumTRPM\n' +
  'BgELlcuoDGBpHfFscmO2Dg+EaZetXTTnF/QunGlpabECgYEA5HXe6hJ19hGHG9Xi\n' +
  'GjJv4k4bBitNuKiaLLgbsDOtjU/DRjb+nIChRMHkQ01eGeaPnUz7iOxZZxJwOGgG\n' +
  'vGjEDD85vL6L1mYPEyEvwvWpv20sOyAE6363Ttm+Unm2vEIFG/iME5y/bP2ZjpnV\n' +
  'IlBND+2J8ixNis7tix7SOKyyzm8CgYEAyeXtNEw7Lr0MWZo96qdSeaISujbpSgWi\n' +
  'xwfqqeT5d7vrF7kzNcxLgK28EOFUFyDlxP8vkanyyxB4qFiTeLap2Jkl3cBG6/TO\n' +
  'HnTw4xxqQ9r7m5DBNGNV+3aVTeW1dJy3uGcpjWXjUUeglHQ0YT7TVvis587JDCs5\n' +
  'wJ5F5w8wU70CgYEAuWJcbJxmVDKM7C12t8NNvtmaXDsvajSGRttuvGBy6ERdNNDT\n' +
  'crN+KYkcbPCO93179CzPv5/qPBVeMqdXL/PjgfycIWiNmIBgoyk+1Hj8MXWpeqDU\n' +
  '3TOKE9Xk9pAFlGYON1BMem2reAmhXXG+3YVDwzUBxx3kHksjvsxX0d1xiskCgYB8\n' +
  'g8Lwt/rf7lOJhyicaSjiPuRR17+0mRk0qls9ACwifdCVRvCgQyhlacBMoMrdoLpT\n' +
  '7hWGPkuwlK31FPuOPQkuvfSueADFUKs1+WT+i+21f34hCPs+tey3MwENk5d/HY/o\n' +
  'uCbWP3ocDJKqO6h6OObaAm+QXuV7DcWGV5ZA1As3+QKBgQCSkD76f2TKgKuZ6OJT\n' +
  'G8CcCM+iH770BxmRLJB1WINFBQdIGvzLBs2MJcPi+oVVyDbfOmG7Hm8PIRc8Utgb\n' +
  'ZhM0w6G55UrOf1aQmy3j2a+p1Rw4MKYERTbLc0V/HIQCFfx7PG8oK3/GWmongmMn\n' +
  'TQWf6qxjxbbWY8F/ZGaftl4UAg==\n' +
  '-----END PRIVATE KEY-----\n';

Object.assign(global, { TextDecoder, TextEncoder });

describe('WHEN "decryptSignedJwtPayload" is called', () => {
  it('AND arguments correct MUST return correct user data ', async () => {
    expect(await decryptSignedJwtPayload(JWE, pkcs8PrivateKey)).toEqual(FULL_OTP_USER_DATA);
  });

  it('AND private key is invalid MUST throw error', async () => {
    const error = new TypeError('"pkcs8" must be PKCS#8 formatted string');

    expect(decryptSignedJwtPayload(JWE, '')).rejects.toThrow(error);
  });

  it('AND jwe is invalid MUST throw error', async () => {
    const error = new TypeError('Invalid Compact JWE');

    expect(decryptSignedJwtPayload('jwe', pkcs8PrivateKey)).rejects.toThrow(error);
  });
});
