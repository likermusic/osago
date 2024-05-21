import type { IUser } from '@sravni/types/lib/auth';
import { useCallback } from 'react';

import { useAppDispatch } from 'shared/lib/redux';
import { useGetSendAnalytics } from 'shared/lib/sendAnalyticsEvents';

import { userSlice } from 'entities/user';

export function useSilentAuthWl() {
  const dispatch = useAppDispatch();
  const sendAnalyticsEvent = useGetSendAnalytics();

  /**
   * @param phone - Номер телефона с которым зашел пользователь
   * @param userId - Id пользователя, который вернула проверка смс
   * @param hint - Имя юзера в окне авторизации
   * */
  return useCallback(
    (phone: string, userId: string, hint: string) => {
      dispatch(
        userSlice.actions.setUser({
          phone_number: phone,
          sub: userId,
          name: hint,
        } as IUser),
      );

      sendAnalyticsEvent('osago_contact_step_authorize');
    },
    [sendAnalyticsEvent, dispatch],
  );
}
