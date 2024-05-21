import { useFormContext } from '@sravni/cosago-react-library/lib/hooks';

import { useAppSelector } from 'shared/lib/redux';

import type { ContactsCommonFields } from 'entities/contacts';
import { accountSelector } from 'entities/user';

export function useCheckPhoneConfirm() {
  const { watch } = useFormContext<ContactsCommonFields>();
  const formPhoneValue = watch('mobilePhone');
  const { phone_number: currentNumber } = useAppSelector(accountSelector) || {};

  return {
    isPhoneConfirmed: !!currentNumber && currentNumber === formPhoneValue,
    accountUserPhone: currentNumber,
    formPhoneValue,
  };
}
