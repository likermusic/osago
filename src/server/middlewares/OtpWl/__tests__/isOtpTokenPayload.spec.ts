import { FULL_OTP_USER_DATA } from 'mocks/OtpUserData';

import { isOtpTokenPayload } from '../isOtpTokenPayload';

const MINIMAL_OTP_USER_DATA = {
  exp: 1234,
  tokenData: {
    personalData: {},
  },
};

describe('WHEN "isOtpTokenPayload" is called', () => {
  it.each`
    payload                                        | res
    ${''}                                          | ${false}
    ${null}                                        | ${false}
    ${undefined}                                   | ${false}
    ${{}}                                          | ${false}
    ${[]}                                          | ${false}
    ${{ ...MINIMAL_OTP_USER_DATA, tokenData: {} }} | ${false}
    ${FULL_OTP_USER_DATA}                          | ${true}
    ${MINIMAL_OTP_USER_DATA}                       | ${true}
  `('AND payload is - $payload MUST return $res', ({ payload, res }) => {
    expect(isOtpTokenPayload(payload)).toEqual(res);
  });
});
