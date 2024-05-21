import type { TFormHintsNullable } from 'entities/hintNotification';
import { FULL_NAME_HINT, REGISTRATION_ADDRESS_FLAT_HINT, REGISTRATION_ADDRESS_HINT } from 'entities/hintNotification';
import type { OwnerCommonFields } from 'entities/owner';

export const FormFields: Record<keyof OwnerCommonFields, string> = {
  birthday: 'Дата рождения',
  fullName: 'Фамилия Имя Отчество',
  passportIssueDate: 'Дата выдачи паспорта',
  passportNumber: 'Серия и номер паспорта',
  registrationAddress: 'Адрес регистрации',
  registrationAddressFlat: 'Номер квартиры',
  policyHolder: `Кто страхует транспортное средство?`,
};

export const FormHints: TFormHintsNullable<OwnerCommonFields, 'birthday' | 'passportIssueDate' | 'passportNumber'> = {
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
  policyHolder: {
    title: 'Страхователь - человек, заключающий договор ОСАГО.',
    text: 'Рекомендуем указать здесь собственника или одного из водителей.',
  },
};
