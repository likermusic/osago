// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/naming-convention */
export const RESEND_CODE_WAIT_SECONDS = 30;
export const ALLOWED_REQUEST_CODE_ATTEMTS = 3;

export enum AUTH_ERRORS {
  WRONG_CODE = 'WRONG_CODE',
  AUTHORIZE_FAILED = 'AUTHORIZE_FAILED',
  SESSION_EXPIRED = 'SESSION_EXPIRED',
  DEFAULT = 'SESSION_EXPIRED',
  ACCESS_DENIED = 'ACCESS_DENIED',
  SEND_SMS_FAILED = 'SEND_SMS_FAILED',
  CODE_REQUEST_ATTEMTS_EXHAUSTED = 'CODE_REQUEST_ATTEMTS_EXHAUSTED',
  CODE_LENGTH = 'smsCode must be exactly 4 characters',
}

export const AUTH_ERRORS_MESSAGES: Record<AUTH_ERRORS, string> = {
  [AUTH_ERRORS.SESSION_EXPIRED]: '',
  [AUTH_ERRORS.ACCESS_DENIED]: 'У вас нет прав на выполнение данной операции',
  [AUTH_ERRORS.WRONG_CODE]: 'Неверный код',
  [AUTH_ERRORS.AUTHORIZE_FAILED]: 'Возникла ошибка при авторизации',
  [AUTH_ERRORS.DEFAULT]: 'Возникла ошибка при авторизации',
  [AUTH_ERRORS.SEND_SMS_FAILED]: 'Возникла ошибка при отправке смс',
  [AUTH_ERRORS.CODE_REQUEST_ATTEMTS_EXHAUSTED]: 'Превышено максимальное число запросов смс',
  [AUTH_ERRORS.CODE_LENGTH]: 'Код должен состоят из 4 цифр',
};
