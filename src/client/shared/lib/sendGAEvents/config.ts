import { FormStepId } from 'shared/config/formStepId';

export enum FunnelType {
  Standard = 'Standard',
  QuickCalc = 'QuickCalc',
  QuickRenewal = 'QuickRenewal',
  QuickProlongation = 'QuickProlongation',
}

export const EVENT_LABEL_NAME: Record<string, string> = {
  [FormStepId.Drivers]: 'Водитель',
  [FormStepId.CarOwner]: 'Собственник',
  [FormStepId.PolicyHolder]: 'Страхователь',
  [FormStepId.Contacts]: 'Контакты',
};

export const PersonFormFields: Record<string, string> = {
  birthday: 'Дата рождения',
  fullName: 'Фамилия Имя Отчество',
  passportIssueDate: 'Дата выдачи паспорта',
  passportNumber: 'Серия и номер паспорта',
  registrationAddress: 'Адрес регистрации',
  registrationAddressFlat: 'Номер квартиры',
  policyHolder: 'Кто страхует авто',
};
