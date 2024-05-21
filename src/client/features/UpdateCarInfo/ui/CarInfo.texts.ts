import { Documents } from '@sravni/cosago-react-library/lib/constants';
import type { VehicleType } from '@sravni/cosago-react-library/lib/types';

import { VEHICLE_TEXT_MAP_GENITIVE_CASE, VEHICLE_TEXT_MAP_NOMINATIVE_CASE } from 'shared/config/vehicleTypeText';

import type { CarInfoCommonFields } from 'entities/carInfo';
import type { TFormHintsNullableAndDifferFromType } from 'entities/hintNotification';

export type TFormFields = keyof (CarInfoCommonFields & { documentNumberEPTS: string });

export const FormFields = (vehicleType: VehicleType): Record<TFormFields, string> => ({
  identifyType: `Идентификатор ${VEHICLE_TEXT_MAP_GENITIVE_CASE[vehicleType]}`,
  bodyNumber: 'Номер кузова',
  chassisNumber: 'Номер шасси',
  enginePower: 'Мощность двигателя',
  carBrand: 'Марка',
  carManufactureYear: 'Год выпуска',
  carModel: 'Модель',
  carNumber: `Номер ${VEHICLE_TEXT_MAP_GENITIVE_CASE[vehicleType]}`,
  carVinNumber: 'VIN номер',
  documentIssueDate: 'Дата выдачи документа',
  documentNumber: 'Серия и номер',
  documentType: 'Документ о регистрации',
  documentNumberEPTS: 'Номер',
  carModification: 'Модификация',
  category: 'Категория авто',
});

export const FormHints = (
  vehicleType: VehicleType,
): TFormHintsNullableAndDifferFromType<
  CarInfoCommonFields,
  'documentNumber' | 'identifyType',
  'carBrand' | 'bodyNumber' | 'chassisNumber' | 'carVinNumber' | 'category'
> => ({
  bodyNumber: null,
  chassisNumber: null,
  enginePower: {
    text: 'Введите целое значение в лошадиных силах (Л.С.). Если в документах указано дробное значение, то округлите его в большую сторону до целого числа',
  },
  carBrand: null,
  carManufactureYear: {
    text: `Указан в документах на ${VEHICLE_TEXT_MAP_NOMINATIVE_CASE[vehicleType]} (ПТС или СТС)`,
  },
  carModel: {
    text: 'Если нет полного совпадения - выбирайте название семейства вашей модели',
  },
  carNumber: {
    text: 'Введите госномер. Ваши данные подгрузятся автоматически. Если введен СТС, данное поле обязательно для заполнения',
  },
  carVinNumber: null,
  identifyType: {
    [Documents.CarIdentifyType.BodyNumber]: {
      text: `Необходимо заполнить только если у вашего ${VEHICLE_TEXT_MAP_GENITIVE_CASE[vehicleType]} нет VIN. Если VIN есть, то вернитесь на шаг назад и выберите его в качестве идентификатора`,
    },
    [Documents.CarIdentifyType.ChassisNumber]: {
      text: `Необходимо заполнить только если у вашего ${VEHICLE_TEXT_MAP_GENITIVE_CASE[vehicleType]} нет VIN. Если VIN есть, то вернитесь на шаг назад и выберите его в качестве идентификатора`,
    },
    [Documents.CarIdentifyType.VIN]: {
      text: `Уникальный идентификатор вашего ${VEHICLE_TEXT_MAP_GENITIVE_CASE[vehicleType]}, если у вашего ${VEHICLE_TEXT_MAP_GENITIVE_CASE[vehicleType]} его нет, то укажите номер кузова или шасси`,
    },
  },
  documentIssueDate: {
    text: 'Дата выдачи указана в самом документе',
  },
  documentNumber: {
    [Documents.ECarDocumentType.PTS]: {
      text: 'Укажите серию и номер ПТС. Третий и четвертый символ в серии должны быть буквами. ПТС это документ формата А4. Не перепутайте его со свидетельством о регистрации (ламинированная карточка) ',
    },
    [Documents.ECarDocumentType.STS]: {
      text: `Укажите серию и номер СТС. Если ${VEHICLE_TEXT_MAP_NOMINATIVE_CASE[vehicleType]} еще не поставлен на учет, то вернитесь на шаг назад и выберите документ ПТС или ЭПТС`,
    },
    [Documents.ECarDocumentType.EPTS]: {
      text: 'Выписку из еПТС можно получить в личном кабинете на сайте https://elpts.ru/. Электроный ПТС и обычный ПТС на бумаге - это разные документы',
    },
  },
  documentType: {
    text: `Если ${VEHICLE_TEXT_MAP_NOMINATIVE_CASE[vehicleType]} не стоит на учете, то выберите тип документа ПТС или ЭПТС (для электронных), если стоит на учете -  выберите тип СТС (Свидетельство о регистрации)`,
  },
  carModification: {
    text: 'Выберете комплектацию из выпадающего списка по совпадению названия и мощности',
  },
  category: null,
});

export const FormTexts = {
  emptyCarNumber: 'Без номера',
  emptyBrand: (vehicleType: VehicleType) => `Введите данные ${VEHICLE_TEXT_MAP_GENITIVE_CASE[vehicleType]}`,
  vin: 'VIN:',
  fillByNumber: 'Заполнить по номеру',
};
