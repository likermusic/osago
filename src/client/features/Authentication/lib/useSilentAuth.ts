import { useFormContext } from '@sravni/cosago-react-library/lib/hooks';
import { AuthLoginByOtacHelper } from '@sravni/utils/lib/auth';
import { useCallback, useRef } from 'react';

import { useAppDispatch } from 'shared/lib/redux';
import { useGetSendAnalytics } from 'shared/lib/sendAnalyticsEvents';
import { sendSentryClientError } from 'shared/lib/sendSentryClientError';

import { setContactsDefault } from 'entities/contacts';
import { getUserInfo, userSlice } from 'entities/user';

export function useSilentAuth(smsCodeName: string) {
  const { setError } = useFormContext();
  const [getUser] = getUserInfo();
  const dispatch = useAppDispatch();
  const authHelper = useRef<AuthLoginByOtacHelper | null>(null);
  const sendAnalyticsEvent = useGetSendAnalytics();

  /**
   * @param currentOtac - Хэш аутентификации после проверки смс
   * @param hint - Имя юзера в окне авторизации
   * @param preparedAuthResult - promise который был получен в результате вызова функции prepareAuth
   * @param onReady - функцию которую вызовет аутентификатор, если все прошло успешно
   * */
  const runSilentAuth = useCallback(
    async (currentOtac?: string, hint?: string, preparedAuthResult?: Promise<void>, onReady?: Function) => {
      if (currentOtac) {
        let prepareResult = preparedAuthResult;
        if (!prepareResult) {
          /**
           * Если промис не вернулся - значит мы пытаемся авторизоваться в вебвью, где заблокированы вторичные окна
           * Тогда вызов login откроет спиннер авторизации в текущем окне и пройдет по такому же флоу, как в шапке сайта
           * */
          prepareResult = Promise.resolve();
        }

        try {
          await prepareResult;
          await authHelper.current?.login({ otac: currentOtac, hint });
          const user = await getUser();
          if (user) {
            dispatch(userSlice.actions.setUser(user.data));
            // TODO: нужно тут чтобы в событии osago_wants_return_sms были контакты OS-8410: унести в общую фичу восстановления
            dispatch(
              setContactsDefault({
                mobilePhone: user.data?.phone_number ?? '',
                email: user.data?.email ?? '',
                smsCode: '',
                userAgreement: false,
              }),
            );
            sendAnalyticsEvent('osago_contact_step_authorize');
            onReady?.();
            return;
          }
        } catch (error) {
          authHelper.current?.destroy();
          setError(smsCodeName, error.message);
          return;
        }
      }

      if (authHelper.current && preparedAuthResult) {
        try {
          authHelper.current?.destroy();
        } catch (e) {
          // пробуем удалить инстанс для окна аутентификации
        }
      }

      /**
       * Если otac не пришел, то все равно дергаем функцию возрата,
       * потому что она вызовет валидатор и вернет сообщение об ошибке
       * */
      onReady?.();
    },
    [sendAnalyticsEvent, dispatch, getUser, setError, smsCodeName],
  );

  /**
   * Функция возвращает коллбэк, который запускает открытие окна авторизации
   * Ее надо запускать максимально близко к событию клика на кнопку или любому другому доверенному событию
   * Если ее запустить в асинхронном режиме - браузер может заблокировать дочернее окно
   * и пользак не сможет зарегистрироваться
   * */
  const prepareAuth = useCallback(async () => {
    try {
      authHelper.current = new AuthLoginByOtacHelper({
        type: 'modal',
      });

      // если не указать await - exception выкинет в клиентский код и текущий try не сработает
      return await authHelper.current?.prepare();
    } catch (e) {
      /**
       * скорее всего не смогли открыть окно,
       * пересоздаем хелпер, но уже с указанием, что мы в вебвью
       * */
      authHelper.current = new AuthLoginByOtacHelper({
        type: 'modal',
        isWebview: true,
      });

      return undefined;
    }
  }, []);

  const destroyAuth = useCallback(() => {
    try {
      authHelper.current?.destroy();
    } catch (e) {
      sendSentryClientError(e, {
        placement: 'useSilentAuth',
      });
    }
  }, []);

  return {
    prepareAuth,
    runSilentAuth,
    destroyAuth,
  };
}
