import { getSilentSignInUrl, getSilentSignInVerifyUrl } from '@sravni/utils/lib/auth';
import type { AxiosError } from 'axios';

import type { Auth } from 'commonTypes/api/auth';

import { config } from '../../../constants/config';
import { requestWithoutTokenPost } from '../../../utils/api/api';
import { getErrObject } from '../../../utils/getErrObject';
import { logMessage } from '../../../utils/logMessage';

export const signin = async (ctx: App.ExtendedContext) => {
  const { phone, name, isWL = false } = ctx.request.body;

  logMessage('SIGNIN_LOG', {
    ip: ctx.request.ip,
    phone,
  });

  const url = getSilentSignInUrl({ webPath: config.WEB_PATH });

  try {
    await requestWithoutTokenPost<void>(url, {
      customer: isWL ? 'Партнерская программа' : 'Сайт',
      name,
      phone,
      productName: 'ОСАГО',
    });

    return true;
  } catch (e) {
    logMessage('BAD_RESPONSE_SIGNIN', getErrObject(e as AxiosError));
    throw e;
  }
};

export const verify = async (ctx: App.ExtendedContext) => {
  const { code, phone } = ctx.request.body;

  logMessage('VERIFY_LOG', {
    ip: ctx.request.ip,
    phone,
  });

  const url = getSilentSignInVerifyUrl({ webPath: config.WEB_PATH });

  const { data } = await requestWithoutTokenPost<Auth.IAuthSMSVerifyResponse>(url, {
    SendEmailConfirmation: false,
    code,
    phone,
  });
  return data;
};
