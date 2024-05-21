// Сервер не умеет в абсолютные пути
import request from '@sravni/server-utils/lib/request';
import type { AxiosError } from 'axios';

import type { User } from '../../../../types/api/user';
import { config } from '../../../constants/config';
import { requestWithTokenPost } from '../../../utils/api/api';
import { getErrObject } from '../../../utils/getErrObject';
import { logMessage } from '../../../utils/logMessage';
import { getUserAuthHeader } from '../../../utils/openid';

export const requestAssignUserIdPost = async (query: User.PostAssignUserIdPostParams) => {
  if (!query?.orderHash || !query?.userId) {
    return null;
  }

  const { data: isAssign } = await requestWithTokenPost<User.PostAssignUserId, User.PostAssignUserIdPostParams>(
    `${config.OSAGOGATEWAY}/v1/orders/assignUserId`,
    config.OSAGOGATEWAY_SERVICE_SCOPE,
    query,
  );

  return isAssign;
};

export const checkUserHasEsia = async (userId: string) => {
  try {
    const headers = (await getUserAuthHeader()) || {};
    const { data } = await request.get<User.UserModel>(`${config.ISSUER}/api/users/${userId}`, {
      headers,
    });

    return data.externalProviders?.includes('Esia');
  } catch (e) {
    return false;
  }
};

export const getIdentityUser = async (userId: string): Promise<User.UserModel | null> => {
  try {
    const headers = (await getUserAuthHeader()) || {};
    const { data } = await request.get<User.UserModel>(`${config.ISSUER}/api/users/${userId}`, {
      headers,
    });

    return data;
  } catch (e) {
    logMessage('GET_IDENTITY_USER', getErrObject(e as AxiosError));
    return null;
  }
};
