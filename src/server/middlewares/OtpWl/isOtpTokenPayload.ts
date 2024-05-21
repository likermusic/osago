import type { OTP } from 'commonTypes/api/OTPData';

export const isOtpTokenPayload = (payload: unknown): payload is OTP.OtpTokenPayload =>
  typeof payload === 'object' &&
  !!payload &&
  'exp' in payload &&
  'tokenData' in payload &&
  // TODO https://sravni-corp.atlassian.net/browse/OS-6806
  //  убрать после апа версии ts на 4.9+ пока он не умеет в такое https://stackoverflow.com/a/73987294
  // @ts-ignore
  typeof payload?.tokenData === 'object' &&
  // @ts-ignore
  !!payload?.tokenData &&
  // @ts-ignore
  typeof payload.tokenData?.personalData === 'object';
