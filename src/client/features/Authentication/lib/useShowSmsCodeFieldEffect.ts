import { useFormContext } from '@sravni/cosago-react-library/lib/hooks';
import { phoneScheme } from '@sravni/cosago-react-library/lib/validationSchemes';
import { useEffect, useRef } from 'react';

import { useAppDispatch } from 'shared/lib/redux';

import { authSmsSlice } from 'entities/authSms';
import type { ContactsCommonFields } from 'entities/contacts';

import { useCheckPhoneConfirm } from './useCheckPhoneConfirm';

export function useShowSmsCodeFieldEffect(isPhoneConfirmedCallback?: () => void) {
  const dispatch = useAppDispatch();
  const { watch } = useFormContext<ContactsCommonFields>();
  const formPhoneValue = watch('mobilePhone');
  const { isPhoneConfirmed } = useCheckPhoneConfirm();

  const isPhoneConfirmedCallbackOnce = useRef(isPhoneConfirmedCallback);

  useEffect(() => {
    if (isPhoneConfirmed) {
      dispatch(authSmsSlice.actions.setShowSmsCode(false));
      isPhoneConfirmedCallbackOnce.current?.();
    } else {
      phoneScheme()
        .validate(formPhoneValue)
        .then(() => {
          dispatch(authSmsSlice.actions.setShowSmsCode(true));
        })
        .catch(() => {
          dispatch(authSmsSlice.actions.setShowSmsCode(false));
        });
    }
    //  Завязка на isPhoneConfirmed приводит к эффекту, что сразу после авторизации isPhoneConfirmed становится тру и мы вызываем isPhoneConfirmedCallbackOnce что вызывает сабмит анкеты еще раз
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formPhoneValue, dispatch]);
}
