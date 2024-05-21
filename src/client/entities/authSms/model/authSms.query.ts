import { BFF_API_ROUTES } from 'constants/apiRoutes';
import { ALLOWED_REQUEST_CODE_ATTEMTS, AUTH_ERRORS } from 'constants/auth';

import { baseRTKApi } from 'shared/api/baseApi';
import { sendSentryClientError } from 'shared/lib/sendSentryClientError';

import type { VerifyResponse } from '../types';

import {
  authSmsSlice,
  setAuthError,
  setShowSmsCode,
  setSignInCredentials,
  signInFinish,
  signInStarted,
  updatePhonesInfo,
} from './authSms.slice';

export const queries = baseRTKApi.injectEndpoints({
  endpoints: (build) => ({
    postSMSCodeWorker: build.mutation<boolean, { phone: string }>({
      query: (body) => ({
        url: BFF_API_ROUTES.signin,
        method: 'POST',
        body,
      }),
      // дока https://redux-toolkit.js.org/rtk-query/usage/customizing-queries#automatic-retries
      extraOptions: { maxRetries: 3 },
      async onQueryStarted({ phone }, { dispatch, queryFulfilled, getState }) {
        try {
          const store = getState() as Store;
          const phoneInfo = store.authSms.phonesInfo[phone];
          const { account } = store.user;

          if (account?.phone_number === phone) {
            return;
          }

          if (!phone) {
            dispatch(setShowSmsCode(false));
            return;
          }

          if (phoneInfo?.requestCodeAttemts >= ALLOWED_REQUEST_CODE_ATTEMTS) {
            dispatch(setAuthError(AUTH_ERRORS.CODE_REQUEST_ATTEMTS_EXHAUSTED));
          }

          dispatch(
            updatePhonesInfo({
              phoneNumber: phone,
              phoneInfo: {
                requestCodeAttemts: (phoneInfo?.requestCodeAttemts || 0) + 1,
                enterCodeAttempts: 0,
              },
            }),
          );

          const { data: isQueryFulfilled } = await queryFulfilled;

          if (!isQueryFulfilled) {
            dispatch(setAuthError(AUTH_ERRORS.SEND_SMS_FAILED));
          }
        } catch (e) {
          dispatch(setAuthError(AUTH_ERRORS.SEND_SMS_FAILED));
        }
      },
    }),
    postVerifySMSCodeWorker: build.mutation<VerifyResponse, { code: string; phone: string }>({
      query: (body) => ({
        url: BFF_API_ROUTES.verify,
        method: 'POST',
        body,
      }),
      extraOptions: { maxRetries: 0 },
      async onQueryStarted({ phone }, { dispatch, queryFulfilled, getState }) {
        try {
          const store = getState() as Store;
          const phoneInfo = store.authSms.phonesInfo[phone];

          if (phoneInfo?.requestCodeAttemts >= ALLOWED_REQUEST_CODE_ATTEMTS) {
            dispatch(setAuthError(AUTH_ERRORS.CODE_REQUEST_ATTEMTS_EXHAUSTED));
            dispatch(signInFinish());
            return;
          }

          dispatch(
            updatePhonesInfo({
              phoneNumber: phone,
              phoneInfo: {
                enterCodeAttempts: (phoneInfo?.enterCodeAttempts || 0) + 1,
              },
            }),
          );

          dispatch(signInStarted());
          const { data } = await queryFulfilled;
          const { username, otac, userId } = data;
          dispatch(setSignInCredentials({ username, otac, userId }));
          dispatch(signInFinish());
          dispatch(authSmsSlice.actions.setShowSmsCode(false));
        } catch (e) {
          const setMessageByStatus = (status: number) => {
            switch (status) {
              case 400:
                // смс код не верный
                dispatch(setAuthError(AUTH_ERRORS.WRONG_CODE));
                break;
              case 429:
                // пользак ввел слишком много неправильных кодов
                dispatch(setAuthError(AUTH_ERRORS.CODE_REQUEST_ATTEMTS_EXHAUSTED));
                break;
              case 500:
              default:
                dispatch(setAuthError(AUTH_ERRORS.AUTHORIZE_FAILED));
                // происходит какая-то фигня, надо отправить ошибку в сентри
                sendSentryClientError(e, {
                  placement: 'postVerifySMSCodeWorker',
                  summary: 'неожиданный статус код авторизации',
                });
            }
          };

          if ('error' in e && (e.error.originalStatus || e.error.status)) {
            setMessageByStatus(e.error.originalStatus || e.error.status);
            return;
          }

          setMessageByStatus(e.status);
        }
      },
    }),
  }),
});

export const usePostSMSCodeWorker = queries.usePostSMSCodeWorkerMutation;
export const usePostVerifySMSCodeWorker = queries.usePostVerifySMSCodeWorkerMutation;
