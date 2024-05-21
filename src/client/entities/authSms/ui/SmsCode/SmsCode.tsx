import { UI } from '@sravni/cosago-react-library/lib/components';
import { Masks } from '@sravni/cosago-react-library/lib/constants';
import { useFormContext } from '@sravni/cosago-react-library/lib/hooks';
import { phoneScheme } from '@sravni/cosago-react-library/lib/validationSchemes';
import { Button, Space, Typography } from '@sravni/react-design-system';
import { useIsMobile } from '@sravni/react-utils';
import cn from 'classnames';
import React, { useEffect, useState } from 'react';

import { AUTH_ERRORS, AUTH_ERRORS_MESSAGES, RESEND_CODE_WAIT_SECONDS } from 'constants/auth';
import type { FieldFactoryProps } from 'types/fieldFactory';

import { useAppDispatch, useAppSelector } from 'shared/lib/redux';
import { sendEventResendSmsCode } from 'shared/lib/sendGAEvents';

import { checkIsSmsCodeValid, useCountDown } from '../../lib';
import {
  authSmsSlice,
  selectAuthErrorSelector,
  selectRequestCodeAttemtsByNumberSelector,
  usePostSMSCodeWorker,
} from '../../model';

import styles from './SmsCode.module.scss';
import { SignInModalTexts } from './SmsCode.texts';

interface Props extends FieldFactoryProps {
  // Отображать счетчик справа
  shouldShowCountdownRight?: boolean;
}

/**
 * Поле ввода смс кода со счетчиком попыток отправки кода и кнопкой "отправить код еще раз"
 */
export const SmsCode: FC<Props> = ({ shouldShowCountdownRight, type }) => {
  const dispatch = useAppDispatch();
  const isMobile = useIsMobile();
  const { clearErrors, setError, watch, setValue } = useFormContext();

  // Обработка ошибок
  const sendOtpError = useAppSelector(selectAuthErrorSelector);

  useEffect(() => {
    if (sendOtpError) setError(type, { message: AUTH_ERRORS_MESSAGES[sendOtpError] });
  }, [sendOtpError, setError, type]);

  // Счетчик попыток отправки смс кода
  const [isResendCodeButtonVisible, setIsResendCodeButtonVisible] = useState(false);
  const { leftCount, resetCountDown } = useCountDown(RESEND_CODE_WAIT_SECONDS, () => {
    setIsResendCodeButtonVisible(true);
  });

  // Логика по запросу смс кода
  const phoneNumber = watch('mobilePhone');
  const [postSMSCodeWorker] = usePostSMSCodeWorker();
  const selectRequestCodeAttemtsByNumber = useAppSelector(selectRequestCodeAttemtsByNumberSelector);
  const requestCodeAttemts = selectRequestCodeAttemtsByNumber(phoneNumber);

  useEffect(() => {
    // Чтобы не отправлять лишние запросы postSMSCode на один и тот же номер
    if ((requestCodeAttemts === undefined || requestCodeAttemts < 1) && phoneScheme().isValidSync(phoneNumber)) {
      clearErrors(type);
      setValue(type, '');
      postSMSCodeWorker({
        phone: String(phoneNumber),
      });
    }
  }, [clearErrors, phoneNumber, postSMSCodeWorker, requestCodeAttemts, setValue, type]);

  // Хендлер на кнопку "запросить код еще раз"
  const handleResendCode = () => {
    clearErrors(type);
    setValue(type, '');
    setIsResendCodeButtonVisible(false);
    resetCountDown();
    postSMSCodeWorker({
      phone: String(phoneNumber),
    });

    sendEventResendSmsCode();
  };

  return (
    <Space
      direction={shouldShowCountdownRight ? 'horizontal' : 'vertical'}
      align={shouldShowCountdownRight ? 'start' : 'center'}
      size={8}
    >
      <UI.ControlledMaskInput
        name={type}
        type={type}
        // Ломает мобильный флоу на анкете
        autoFocus={!isMobile}
        onBlur={(e) => {
          if (!checkIsSmsCodeValid(e?.target?.value)) {
            setError(type, {
              message: AUTH_ERRORS_MESSAGES[AUTH_ERRORS.WRONG_CODE],
            });
          }
        }}
        onFocus={() => {
          clearErrors(type);
          dispatch(authSmsSlice.actions.resetAuthError());
        }}
        className={styles.input}
        label="СМС код"
        mask={Masks.SMS_CODE}
        maskPlaceholder=""
        inputMode="numeric"
      />

      <div className={cn({ [styles.wrapperRight]: shouldShowCountdownRight })}>
        {!isResendCodeButtonVisible && (
          <Typography.Text className="h-color-D50">
            {SignInModalTexts.countdown}
            {leftCount}
          </Typography.Text>
        )}

        {isResendCodeButtonVisible && (
          <Button
            variant="text"
            color="blue"
            onClick={handleResendCode}
          >
            {SignInModalTexts.btn}
          </Button>
        )}
      </div>
    </Space>
  );
};
