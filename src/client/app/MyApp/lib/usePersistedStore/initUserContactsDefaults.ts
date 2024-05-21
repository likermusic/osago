import { setContactsDefault } from 'entities/contacts';

import type { IPersistedStore } from './PersistedStore';

export const initUserContactsDefaults = (storeController: IPersistedStore) => {
  const { getState, dispatch } = storeController.getStore();
  const { account } = getState().user || {};

  if (account) {
    // TODO: OS-8410: унести в общую фичу восстановления
    dispatch(
      /**
       * Пишем в дефолт формы,
       * чтобы предзаполнить контакты из юзера только если в форме нет никаких введенных данных.
       * В данные не пишем, чтобы не поломать валидацию
       * */
      setContactsDefault({
        mobilePhone: account.phone_number ?? '',
        email: account.email ?? '',
        smsCode: '',
        userAgreement: false,
      }),
    );
  }
};
