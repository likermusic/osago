import type { IUser } from '@sravni/types/lib/auth';
import type { AxiosResponse } from 'axios';

import type { Cookies } from 'commonTypes/api/cookies';

import type { Analytics } from '../../../types/api/analytics';
import { config } from '../../constants/config';
import { requestWithoutTokenPost } from '../../utils/api/api';
import { logMessage } from '../../utils/logMessage';

export const requestAnalyticsEventPost = async (query: Analytics.TEventsRequest, user?: IUser, userAgent?: string) => {
  logMessage('REQUEST_FORM_STEP', {
    insurerPhoneNumber: query.query?.insurer?.phone,
    ownerPhoneNumber: query.query?.owner?.phone,
    step: query.eventName,
    userPhone: user?.phone_number,
  });

  await requestWithoutTokenPost<
    Analytics.TEventsResponse,
    Analytics.TEventsRequest & {
      userToken?: IUser['access_token'];
      userAgent?: string;
    }
  >(`${config.OSAGOGATEWAY}/v1/events`, {
    ...query,
    userAgent,
    // Фикс проблемы перехода залогиненного пользователя по ссылке восстановления другого пользователя
    userToken:
      user?.access_token &&
      user?.phone_number &&
      (user.phone_number === query.query?.owner?.phone || user.phone_number === query.query?.insurer?.phone)
        ? user.access_token
        : undefined,
  });

  return true;
};

export const requestsUTMCookies = async (query: Cookies.TUTMCookiesRequest): Promise<Cookies.TUTMCookiesResponse> => {
  const { data } = await requestWithoutTokenPost<
    Cookies.TUTMCookiesRequest,
    AxiosResponse<Cookies.TUTMCookiesResponse>
  >(`${config.COOKIES}/v1.0/cookies`, query);

  return data;
};
