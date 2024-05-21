export const RESEND_CODE_WAIT_SECONDS = 30;
export const CODE_LENGTH = 4;
export const ALLOWED_REQUEST_CODE_ATTEMPTS = 3;
export const ALLOWED_CODE_ENTER_ATTEMPTS = 3;
export const TEXT_DOT_SEPARATOR = ' •\u00A0';

export enum AuthErrorCode {
  WrongCode = 'WrongCode',
  AuthorizeFailed = 'AuthorizeFailed',
  SessionExpired = 'SessionExpired',
  AccessDenied = 'AccessDenied',
  SendSmsFailed = 'SendSmsFailed',
  CodeRequestAttemptsExhausted = 'CodeRequestAttemptsExhausted',
}

export const AUTH_ERRORS_MESSAGES: Record<AuthErrorCode, string> = {
  [AuthErrorCode.SessionExpired]: '',
  [AuthErrorCode.AccessDenied]: 'У вас нет прав на выполнение данной операции',
  [AuthErrorCode.WrongCode]: 'Неверный код',
  [AuthErrorCode.AuthorizeFailed]: 'Возникла ошибка при авторизации',
  [AuthErrorCode.SendSmsFailed]: 'Возникла ошибка при отправке смс',
  [AuthErrorCode.CodeRequestAttemptsExhausted]: 'Превышено максимальное число запросов смс',
};
