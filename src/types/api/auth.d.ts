import type { AUTH_ERRORS } from 'constants/auth';

declare namespace Auth {
  export interface IAuthSMSVerifyResponse {
    otac: string; // одноразовый пароль
    expires: number; // время жизни одноразового пароля в секундах
    username: string; // username пользователя
    userId: AUTH_ERRORS;
  }
}
