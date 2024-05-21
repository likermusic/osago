import { useFormContext } from '@sravni/cosago-react-library/lib/hooks';
import type React from 'react';
import { useCallback, useState } from 'react';

import type { Forms } from 'types/clientForms';

import { useAppSelector } from 'shared/lib/redux';
import { sendEventAuthSmsCode, sendEventAuthStatus, sendEventSubmitOtpCode } from 'shared/lib/sendGAEvents';
import { getErrTextForAuthStatus } from 'shared/lib/sendGAEvents/events';

import { selectAuthCredentials, useSendOtp } from 'entities/authSms';
import { checkIsSmsCodeValid } from 'entities/authSms/lib';
import { isWLSelector } from 'entities/whiteLabels';

import { FormBodyTexts } from '../ui/FormBody/FormBody.texts';

import { useCheckPhoneConfirm } from './useCheckPhoneConfirm';
import { useSilentAuth } from './useSilentAuth';
import { useSilentAuthWl } from './useSilentAuthWl';

export type UseApplyContactsFormProps = {
  smsCodeName: Forms.FieldName;
  phoneName: Forms.FieldName;
  onSubmit: (e?: React.BaseSyntheticEvent) => void;
  /**
   * В форме у нас можно сразу отправить форму если пользак уже залогинен
   * А на лендинге мы прячем поле когда он ввел код смс, shouldUseHandleForce тогда выставляем в true, когда поле смс скрыто
   * */
  shouldUseHandleForce?: boolean;
};

// TODO: добавить получение типа авторизации https://sravni-corp.atlassian.net/browse/OS-7820
const AUTH_TYPE = 2;

export function useApplySmsCodeAuth(options: UseApplyContactsFormProps) {
  const { smsCodeName, phoneName, onSubmit, shouldUseHandleForce } = options;
  const { setError, getValues } = useFormContext();
  const { runSilentAuth, prepareAuth, destroyAuth } = useSilentAuth(smsCodeName);
  const signInByWl = useSilentAuthWl();
  const { sendOtp, isSignInFetching } = useSendOtp();
  const { shouldShowSmsCode } = useAppSelector(selectAuthCredentials);
  const { isPhoneConfirmed } = useCheckPhoneConfirm();
  const isWl = useAppSelector(isWLSelector);
  const values = getValues();
  const otpCode = values[smsCodeName];
  const phone = values[phoneName];
  const [isRequestSubmitting, setIsRequestSubmitting] = useState(false);

  /**
   * Запуск приложения по-новому флоу, когда тихая аутентификация сразу после ввода смс
   * чтобы не вернуть в форму промис, функция должна оставатьс синхронной
   * */
  const handleCheckOtpSite = useCallback(
    async (e?: React.FormEvent) => {
      try {
        sendEventAuthStatus({
          actionType: 'Запрос',
          authType: AUTH_TYPE,
        });

        setIsRequestSubmitting(true);

        const preparedAuthWnd = prepareAuth();
        const result = await sendOtp(otpCode, phone);
        sendEventAuthSmsCode();

        if (result?.otac) {
          await runSilentAuth(result?.otac, result?.userName, preparedAuthWnd);
          // сабмитим анкету после успешной авторизации
          await onSubmit();
          sendEventSubmitOtpCode();
          sendEventAuthStatus({
            actionType: 'Результат',
            authType: AUTH_TYPE,
            result: 'Успех',
          });
        } else {
          // убиваем окошко с авторизацией если верификация не пройдена
          destroyAuth();

          sendEventAuthStatus({
            actionType: 'Результат',
            authType: AUTH_TYPE,
            result: 'Не успех',
          });
        }
      } catch (error) {
        setError(smsCodeName, { message: error.message });
        sendEventAuthStatus({
          actionType: 'Результат',
          authType: AUTH_TYPE,
          result: getErrTextForAuthStatus(error),
        });
      } finally {
        // эта функция висит на обработчике формы и если форму не остановить она сделает сабмит и поломает страницу
        e?.preventDefault();
        setIsRequestSubmitting(false);
      }

      return false;
    },
    [destroyAuth, onSubmit, otpCode, phone, prepareAuth, runSilentAuth, sendOtp, setError, smsCodeName],
  );

  const handleCheckOtpWL = useCallback(
    async (e?: React.FormEvent) => {
      try {
        sendEventAuthStatus({
          actionType: 'Запрос',
          authType: AUTH_TYPE,
        });

        setIsRequestSubmitting(true);

        const result = await sendOtp(otpCode, phone);
        if (result?.otac && result?.userId) {
          signInByWl(phone, result.userId, result.userName);
          sendEventSubmitOtpCode();
          sendEventAuthStatus({
            actionType: 'Результат',
            authType: AUTH_TYPE,
            result: 'Успех',
          });

          onSubmit();

          return;
        }
        // если при верификации произошла ошибка - выкидывае исключение, чтобы попасть в общий обработчик ошибок
        throw new Error('Не удалось пройти авторизацию');
      } catch (error) {
        setError(smsCodeName, error.message);
        sendEventAuthStatus({
          actionType: 'Результат',
          authType: AUTH_TYPE,
          result: getErrTextForAuthStatus(error),
        });
      } finally {
        // эта функция висит на обработчике формы и если форму не остановить она сделает сабмит и поломает страницу
        e?.preventDefault();
        setIsRequestSubmitting(false);
      }

      return false;
    },
    [onSubmit, otpCode, phone, sendOtp, setError, signInByWl, smsCodeName],
  );

  const handleCheckOtp = isWl ? handleCheckOtpWL : handleCheckOtpSite;

  return {
    handleFormSubmit: shouldUseHandleForce || shouldShowSmsCode ? handleCheckOtp : onSubmit,
    shouldShowSmsCode,
    isDisableSubmitButton: !checkIsSmsCodeValid(otpCode) && !isPhoneConfirmed,
    isSignInFetching: isSignInFetching || isRequestSubmitting,
    smsSubmitButtonTitle: shouldShowSmsCode ? FormBodyTexts.sendOtp : undefined,
  };
}
