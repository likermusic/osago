import { Widgets } from '@sravni/cosago-react-library/lib/components';
import { NotificationManager } from '@sravni/react-design-system/lib/Notifications';

import { BFF_PROXY_API } from 'constants/apiRoutes';

import { axiosWithRetry } from 'shared/api/requestInstance';
import { sendEventEsiaLoginError } from 'shared/lib/sendGAEvents';

import { setContactsDefault } from 'entities/contacts';
import { addEsiaErrorAttempt, setEsiaStep, setUser } from 'entities/user';

import { ERROR_ESIA_POPUP_MESSAGE_DELAY, ERROR_MESSAGE_DELAY } from '../../AuthenticationEsia.config';
import { AuthenticationEsiaTexts } from '../../AuthenticationEsia.texts';

const showErrorNotification = (currentAttempt: number) => {
  if (currentAttempt >= 2) {
    return;
  }
  NotificationManager.show(
    AuthenticationEsiaTexts.errorTitle,
    AuthenticationEsiaTexts.descriptionTryAgain,
    '',
    ERROR_MESSAGE_DELAY,
    'info',
    true,
  );
};

// TODO: OS-8410: унести в общую фичу восстановления стора
export const readDataAfterEsiaSignInThunk =
  (step: string): ThunkResult<void> =>
  async (dispatch, getState) => {
    const { user } = getState();

    if (user.isLoggedIn && user.account?.isHasEsia) {
      // юзер есть и у него есть ESIA
      return;
    }

    // устанавливаем шаг при каждом нажатии, чтобы знать в каком блоке выводить ошибку
    dispatch(setEsiaStep(step));

    const connector = new Widgets.EsiaConnector({
      onSuccess: async () => {
        try {
          const { data } = await axiosWithRetry.get(BFF_PROXY_API.account);

          if (data) {
            dispatch(setUser(data));

            // предзаполняем данные для формы из данных о пользователе
            dispatch(
              setContactsDefault({
                email: data.email || '',
                mobilePhone: data.phone_number || '',
                smsCode: '',
                userAgreement: false,
              }),
            );
          } else {
            sendEventEsiaLoginError(step);
            showErrorNotification(user.esiaErrorCount);
            dispatch(addEsiaErrorAttempt());
          }
        } catch (e) {
          sendEventEsiaLoginError(step);
          showErrorNotification(user.esiaErrorCount);
          dispatch(addEsiaErrorAttempt());
        }
      },
      onError: () => {
        sendEventEsiaLoginError(step);
        showErrorNotification(user.esiaErrorCount);
        dispatch(addEsiaErrorAttempt());
      },
      popupWndShowTimeout: ERROR_ESIA_POPUP_MESSAGE_DELAY,
      popupSize: 620,
    });

    await connector.tryLogin();
  };
