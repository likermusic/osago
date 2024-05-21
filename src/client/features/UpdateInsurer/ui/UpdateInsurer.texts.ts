import type { UserCommonFields } from 'shared/types';

import type { TFormHintsNullable } from 'entities/hintNotification';
import { FULL_NAME_HINT, REGISTRATION_ADDRESS_FLAT_HINT, REGISTRATION_ADDRESS_HINT } from 'entities/hintNotification';

export const FormFields: Record<keyof UserCommonFields, string> = {
  birthday: 'Дата рождения',
  fullName: 'Фамилия Имя Отчество',
  passportIssueDate: 'Дата выдачи паспорта',
  passportNumber: 'Серия и номер паспорта',
  registrationAddress: 'Адрес регистрации',
  registrationAddressFlat: 'Номер квартиры',
};

export const FormHints: TFormHintsNullable<UserCommonFields, 'birthday' | 'passportIssueDate' | 'passportNumber'> = {
  birthday: null,
  fullName: {
    text: FULL_NAME_HINT,
  },
  passportIssueDate: null,
  passportNumber: null,
  registrationAddress: {
    text: REGISTRATION_ADDRESS_HINT,
  },
  registrationAddressFlat: {
    text: REGISTRATION_ADDRESS_FLAT_HINT,
  },
};
