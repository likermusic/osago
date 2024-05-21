import type { TVehicleCategories } from 'commonTypes/categories';

import { VEHICLE_TEXT_MAP_GENITIVE_CASE } from 'shared/config/vehicleTypeText';
import { getVehicleTypeFromCategory } from 'shared/lib/getVehicleTypeFromCategory';

import type { DriversCommonFields, UpdateDriversWithSwitchersForm, DriversMultiDriveFields } from 'entities/drivers';
import type { TFormHintsNullable } from 'entities/hintNotification';
import { FULL_NAME_HINT } from 'entities/hintNotification';

export const FormFieldsLabelsMultiDrive: Record<keyof DriversMultiDriveFields, string> = {};

export const FormFieldsLabels = (
  vehicleCategory: TVehicleCategories | undefined,
): Record<keyof DriversCommonFields, string> => ({
  birthday: 'Дата рождения',
  experienceStartDate: `Дата начала стажа ${vehicleCategory ? `категории ${vehicleCategory}` : ''}`,
  fullName: 'Фамилия Имя Отчество',
  hasPreviousLicence: 'Менялись права за год?',
  licenceNumber: 'Серия и номер прав',
  prevLastName: 'Фамилия в прошлых правах',
  prevLicenceNumber: 'Серия и номер прошлых прав',
  // Внутри поля проставляется, тк есть логика в зависимости от текущего значения
  kbm: '',
});

export const FormHints: TFormHintsNullable<DriversCommonFields, 'birthday' | 'kbm'> = {
  birthday: null,
  kbm: null,
  experienceStartDate: {
    text: 'Указывается дата начала стажа по категории транспортного средства, на которое оформляется страховка. Дату можно найти на обороте прав',
  },
  fullName: {
    text: FULL_NAME_HINT,
  },
  hasPreviousLicence: {
    text: 'Если за последний год водитель менял права — укажите данные предыдущих. Это позволит перенести и применить накопленную скидку за безаварийность (КБМ) и снизить цену полиса',
  },
  licenceNumber: {
    text: 'В этом поле укажите действующее удостоверение. Если водитель менял права за последний год - укажите их дальше, чтобы мы могли применить накопленную скидку',
  },
  prevLastName: {
    text: 'Фамилия в прошлых правах',
  },
  prevLicenceNumber: {
    text: 'Данные прошлых прав можно найти в прошлом полисе ОСАГО или в профиле на Госуслугах',
  },
};

export const IsDriverInsurerTooltipText =
  'Тот, на кого оформляется договор ОСАГО. Только он сможет вносить изменения или расторгнуть договор';

export const FormFieldsWithSwitcher = (
  vehicleCategory: TVehicleCategories | undefined,
): Record<keyof UpdateDriversWithSwitchersForm, string> => ({
  ...FormFieldsLabels(vehicleCategory),
  isDriverOwner: `Водитель\u00A0— Собственник ${
    VEHICLE_TEXT_MAP_GENITIVE_CASE[getVehicleTypeFromCategory(vehicleCategory)]
  }`,
  isDriverInsurer: 'Водитель является страхователем',
  passportNumber: 'Серия и номер паспорта',
  passportIssueDate: 'Дата выдачи паспорта',
  registrationAddress: 'Адрес регистрации',
  registrationAddressFlat: 'Номер квартиры',
});
