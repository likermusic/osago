import { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from 'shared/lib/redux';

import { authSmsIsSendingSelector, selectAuthErrorSelector, usePostVerifySMSCodeWorker, authSmsSlice } from '../model';

import { checkIsSmsCodeValid } from './checkIsSmsCodeValid';

export const useSendOtp = () => {
  const [postVerifySMSCodeWorker] = usePostVerifySMSCodeWorker();
  const error = useAppSelector(selectAuthErrorSelector);
  const dispatch = useAppDispatch();
  const isSignInFetching = useAppSelector(authSmsIsSendingSelector);

  const sendOtp = useCallback(
    async (code: string, phone: string) => {
      if (!checkIsSmsCodeValid(code)) {
        return null;
      }

      dispatch(authSmsSlice.actions.resetAuthError());
      const result = await postVerifySMSCodeWorker({ code, phone });

      if ('data' in result && result.data.otac) {
        return {
          otac: result.data.otac,
          userName: result.data.username,
          userId: result.data.userId,
        };
      }

      return null;
    },
    [dispatch, postVerifySMSCodeWorker],
  );

  return {
    error,
    sendOtp,
    isSignInFetching,
  };
};
