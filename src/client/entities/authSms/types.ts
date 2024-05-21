import type { Auth } from 'commonTypes/api/auth';
import type { AUTH_ERRORS } from 'constants/auth';

export type AuthPhoneInfo = {
  enterCodeAttempts: number;
  requestCodeAttemts: number;
};

export interface AuthSmsState {
  authSmsIsSending: boolean;
  authSmsIsValid: boolean;
  shouldShowUserAgreement: boolean;
  showSmsCode: boolean;
  error: Nullable<AUTH_ERRORS>;
  phonesInfo: Record<string, AuthPhoneInfo>;
  otac?: string;
  username?: string;
  userId?: string;
}

export type VerifyResponse = Auth.IAuthSMSVerifyResponse;
