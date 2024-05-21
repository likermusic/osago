import React, { useCallback } from 'react';

import { sendEventResendSmsCode } from 'shared/lib/sendGAEvents';

import { CurrentSmsCodeStatus } from './CurrentSmsCodeStatus';

interface ISmsCodeStatusProps {
  phone?: string;
  callback?: () => void;
  shouldUseName?: boolean;
  timeout: number;
}

export const SmsCodeStatus: FC<ISmsCodeStatusProps> = ({ callback, timeout }) => {
  const onClickResend = useCallback(() => {
    callback?.();

    sendEventResendSmsCode();
  }, [callback]);

  return (
    <CurrentSmsCodeStatus
      onClickResend={onClickResend}
      seconds={timeout}
    />
  );
};
