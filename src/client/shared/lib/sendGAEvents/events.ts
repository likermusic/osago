import type { VehicleType } from '@sravni/cosago-react-library/lib/types';
import { isDefined } from '@sravni/react-utils';
import { AuthError } from '@sravni/utils/lib/errors/auth/AuthError';
import { AuthWindowBlockedError } from '@sravni/utils/lib/errors/auth/AuthWindowBlockedError';
import { AuthWindowClosedError } from '@sravni/utils/lib/errors/auth/AuthWindowClosedError';

import { formatDate } from 'commonUtils/formatters';

import { FlowType } from 'shared/config/FlowType';
import { EVENT_LABEL_NAME } from 'shared/lib/sendGAEvents/config';
import type { IInitialEvent } from 'shared/lib/sendGAEvents/interface';

export type TAnalyticsPage =
  | 'Лендинг'
  | 'Расчет'
  | 'Саммари'
  | 'Заказ'
  | 'Сенкью'
  | 'Новая анкета'
  | 'Анкета'
  | 'Саммари WL';

export type TSaleType = 'Напрямую' | 'Проброс' | 'Выдача';

export enum CrossStatusesType {
  Success = 'Success',
  Failure = 'Failure',
  ServiceIsUnavailable = 'ServiceIsUnavailable',
}

const CROSS_STATUSES_MAP: Record<CrossStatusesType, string> = {
  [CrossStatusesType.Success]: 'Успех',
  [CrossStatusesType.Failure]: 'Кроссы недоступны',
  [CrossStatusesType.ServiceIsUnavailable]: 'Сервис недоступен',
};

/**
 * Старт загрузки кроссов, событие срабатывает на странице ThanksYouPage с кроссами
 */
export const eventCrossShow = (status: CrossStatusesType, numberOfOffers?: number): IInitialEvent => ({
  event: 'mainEvent',
  eventCategory: 'ОСАГО',
  eventAction: `Показ кроссов|${CROSS_STATUSES_MAP[status]}`,
  eventLabel: numberOfOffers,
  eventValue: undefined,
});

/**
 * Событие отправляется при клике пользователем кнопке "Подробнее" кросса
 */
export const eventCrossSelection = (companyName: string, crossName: string, price: number): IInitialEvent => ({
  event: 'mainEvent',
  eventCategory: 'ОСАГО',
  eventAction: 'Выбор кросса',
  eventLabel: `${companyName}|${crossName}`,
  eventValue: price,
});

/**
 * Событие отправляется при клике пользователем по кнопке "Перейти к оплате" на поп-апе кросса
 */
export const eventMoveToCrossPayment = (companyName: string, crossName: string, price: number): IInitialEvent => ({
  event: 'mainEvent',
  eventCategory: 'ОСАГО',
  eventAction: 'Переход к оплате кросса',
  eventLabel: `${companyName}|${crossName}`,
  eventValue: price,
});

export enum DisplayLinkStatusesType {
  Success = 'Success',
  Failure = 'Failure',
}

const DISPLAY_LINK_STATUSES_MAP: Record<DisplayLinkStatusesType, string> = {
  [DisplayLinkStatusesType.Success]: 'Успех',
  [DisplayLinkStatusesType.Failure]: 'Неуспех',
};

/**
 * Событие отправляется при клике пользователем по кнопке "Оплата" на поп-апе кросса
 */
export const eventCrossPayment = (companyName: string, crossName: string, price: number): IInitialEvent => ({
  event: 'mainEvent',
  eventCategory: 'ОСАГО',
  eventAction: 'Оплата кросса',
  eventLabel: `${companyName}|${crossName}`,
  eventValue: price,
});

/**
 * Событие срабатывает при загрузке ссылки для приглашения друга
 */
export const eventLoadInviteFriendLink = (status: DisplayLinkStatusesType): IInitialEvent => ({
  event: 'mainEvent',
  eventCategory: 'ОСАГО',
  eventAction: `Показ ссылки "Приведи друга"|${DISPLAY_LINK_STATUSES_MAP[status]}`,
  eventLabel: 'Сгенерированная ссылка',
});

/**
 * Событие срабатывает при копировании ссылки для приглашения друга
 */
export const eventCopyInviteLink = (): IInitialEvent => ({
  event: 'mainEvent',
  eventAction: 'Копирование ссылки "Приведи друга"',
  eventCategory: 'ОСАГО',
  eventLabel: 'Клик по полю',
});

export type Messenger = 'Whatsapp' | 'VK' | 'Telegram';

/**
 * Событие происходит при нажатии по кнопке шаринга
 */
export const eventShareButtonClick = (): IInitialEvent => ({
  event: 'mainEvent',
  eventAction: 'Шаринг ссылки',
  eventCategory: 'ОСАГО',
  eventLabel: 'Клик по кнопке',
});

/**
 * Событие происходит при нажатии по одной из ссылок шаринга
 */
export const eventShareLinkClick = (messenger: Messenger): IInitialEvent => ({
  event: 'mainEvent',
  eventAction: 'Шаринг ссылки "Приведи друга"',
  eventCategory: 'ОСАГО',
  eventLabel: messenger,
});

/**
 * Событие срабатывает при попадании пользователя на страницу success
 */
export const eventLoadSuccessPage = (companyName = '', price?: number): IInitialEvent => ({
  event: 'mainEvent',
  eventAction: 'Постоплата|Успех',
  eventLabel: [companyName, 'Открытие страницы'],
  eventValue: price,
});

/**
 * Событие срабатывает при попадании пользователя на страницу failure
 */
export const eventLoadFailurePage = (companyName = '', price?: number): IInitialEvent => ({
  event: 'mainEvent',
  eventAction: 'Постоплата|Не успех',
  eventLabel: [companyName, 'Открытие страницы'],
  eventValue: price,
});

export enum ProlongationActionType {
  Show = 'Show',
  NewCalculation = 'NewCalculation',
  RestoreCalculation = 'RestoreCalculation',
}

const PROLONGATION_ACTIONS_MAP: Record<ProlongationActionType, string> = {
  [ProlongationActionType.Show]: 'Показ',
  [ProlongationActionType.NewCalculation]: 'Новый расчет',
  [ProlongationActionType.RestoreCalculation]: 'Переход',
};

export const eventProlongation = (actionType: ProlongationActionType, isUserAuthorized: boolean): IInitialEvent => ({
  event: 'adEvent',
  eventCategory: 'ОСАГО',
  eventAction: 'Авторизация при пролонгации',
  eventLabel: `${isUserAuthorized ? 'Авторизованный' : 'Не авторизованный'}|${PROLONGATION_ACTIONS_MAP[actionType]}`,
  eventValue: undefined,
});

export const eventInfoBlock = (
  elementType: 'Баннер' | 'Сохранение' | 'Телефон' | 'Чат',
  value: 'Плитка' | 'Подробнее' | 'Клик' | 'Отправка',
): IInitialEvent => ({
  event: 'adEvent',
  eventCategory: 'ОСАГО',
  eventAction: 'Инфоблок',
  eventLabel: [elementType, value],
  eventValue: undefined,
});

/**
 * Событие отправляется при нажатии на блок "Данные полиса"
 */
export type TSummaryDataVisibilityValue = 'Скрыть' | 'Показать (ручное)' | 'Показать (авто)';
export const eventSummaryDataVisibility = (action: TSummaryDataVisibilityValue): IInitialEvent => ({
  event: 'mainEvent',
  eventCategory: 'ОСАГО',
  eventAction: 'Данные полиса',
  eventLabel: `Блок|${action}`,
  eventValue: undefined,
});

export type TDataTypeSummaryModalOpen =
  | 'Авто'
  | 'Водители'
  | 'Собственник'
  | 'Страхователь'
  | 'Контакты'
  | 'Период страхования'
  | 'КБМ';
export type TEntrySummaryModalOpen = 'Плитка' | 'Кнопка';
/**
 * Событие срабатывает при нажатии на поле с каким либо типом данных полиса
 */
export const eventSummaryDataModalOpen = (
  dataType: TDataTypeSummaryModalOpen,
  entry: TEntrySummaryModalOpen,
): IInitialEvent => ({
  event: 'mainEvent',
  eventCategory: 'ОСАГО',
  eventAction: 'Изменение данных',
  eventLabel: `${dataType}|${entry}`,
  eventValue: undefined,
});

type TFormValue = string | number | boolean | undefined;

export interface IEventFieldsValueChange {
  fieldName: string;
  previousValue: TFormValue;
  newValue: TFormValue;
  placement?: string;
  eventAction:
    | 'Изменение данных о ТС'
    | 'Заполнение данных о ТС'
    | 'Изменение данных о собственнике'
    | 'Заполнение данных о собственнике'
    | 'Изменение данных о страхователе'
    | 'Заполнение данных о страхователе'
    | 'Изменение контактных данных'
    | 'Заполнение данных о водителе'
    | 'Заполнение контактных данных';
}

/**
 * Событие срабатывает при изменении полей авто, собственника, страхователя или контактных данных
 */
export const eventFieldsValueChange = ({
  eventAction,
  fieldName,
  previousValue,
  newValue,
  placement,
}: IEventFieldsValueChange) =>
  ({
    event: 'adEvent',
    eventCategory: 'ОСАГО',
    eventAction,
    eventLabel: `${fieldName}|Текущее - ${previousValue}|Пользовательское - ${newValue}${
      placement ? `|${placement}` : ''
    }`,
    eventValue: undefined,
  } as const);

export interface IEventFieldsDriversValueChange
  extends Pick<IEventFieldsValueChange, 'fieldName' | 'newValue' | 'previousValue'> {
  driverIndex: number;
  lastChange?: 1;
  eventAction: 'Заполнение данных о водителе' | 'Изменение данных о водителе';
}

/**
 * Событие срабатывает при изменении полей водителей
 */
export const eventFieldsDriversValueChange = ({
  driverIndex,
  fieldName,
  previousValue,
  newValue,
  lastChange,
  eventAction = 'Заполнение данных о водителе',
}: IEventFieldsDriversValueChange) =>
  ({
    event: 'adEvent',
    eventCategory: 'ОСАГО',
    eventAction,
    eventLabel: `${driverIndex}|${fieldName}|Текущее - ${previousValue}|Пользовательское - ${newValue}${
      lastChange ? `|${lastChange}` : ''
    }`,
    eventValue: undefined,
  } as const);

export type TEntryRemoveDriver = 'Кнопка' | 'КБМ';
/**
 * Событие срабатывает при удалении водителя
 */
export const eventRemoveDriver = (driverNum: number, entry: TEntryRemoveDriver): IInitialEvent => ({
  event: 'adEvent',
  eventCategory: 'ОСАГО',
  eventAction: 'Удалить водителя',
  eventLabel: `${driverNum}|${entry}`,
  eventValue: undefined,
});

/**
 * Событие отправляется при применении сортировки
 */
export const eventSortingPropositionsChange = (sortingType: string): IInitialEvent => ({
  event: 'adEvent',
  eventCategory: 'ОСАГО',
  eventAction: 'Сортировка',
  eventLabel: sortingType,
  eventValue: undefined,
});

export interface IEventNewSubmitSummary {
  insuranceCompany: string;
  price: number;
  positionIndex: number;
  isProlongation: boolean;
  isSectionSponsor: boolean;
  entry: 'Плитка' | 'Кнопка';
}

/**
 * Событие отправляется при нажатии на "Оформить полис" на выдаче, в окне Подробнее о страховой (предложении), в окне Подарки от Сравни.ру
 * Признак пролонгации передаем, если клиент продлевает полис у той же СК (метка "Ваша страховая")
 * Точка перехода принимает значения в зависимости от места клика на "Выбрать":
 * -Кнопка - клик в подробной карточке страховой, тогда - "Кнопка"
 * - в остальных случаях значение не прописывается
 */
export const eventNewSubmitSummary = ({
  insuranceCompany,
  price,
  positionIndex,
  isProlongation = false,
  isSectionSponsor = false,
  entry,
}: IEventNewSubmitSummary): IInitialEvent => ({
  event: 'mainEvent',
  eventAction: 'Подробнее',
  eventLabel: [
    insuranceCompany,
    `Позиция на выдаче - ${positionIndex + 1}`,
    `Цена - ${price}`,
    `Метка - ${isSectionSponsor ? 'Спонсор' : ''}
      ${isProlongation ? 'Ваша страховая' : ''}`,
    entry,
  ],
  eventValue: undefined,
});

export interface IEventProductCardMoreClick {
  insuranceCompany: string;
  price: Nullable<number>;
  positionIndex: number;
  isProlongation: boolean;
  isSectionSponsor: boolean;
  entry: 'Плитка' | 'Кнопка';
}

/**
 * Событие срабатывает при открытии блока "Подробнее о страховой" по кнопке "подробнее"/раскрывающемуся меню на блоке ск.
 */
export const eventProductCardMoreClick = ({
  insuranceCompany,
  price,
  positionIndex,
  isProlongation = false,
  isSectionSponsor = false,
  entry,
}: IEventProductCardMoreClick): IInitialEvent => ({
  event: 'mainEvent',
  eventAction: 'Подробнее',
  eventLabel: [
    insuranceCompany,
    `Позиция на выдаче - ${positionIndex + 1}`,
    `Цена - ${price}`,
    isSectionSponsor ? 'Метка - Спонсор' : undefined,
    isProlongation ? 'Метка - Ваша страховая' : undefined,
    entry,
  ].filter(isDefined),
  eventValue: undefined,
});

export type InsuranceInfoType = 'Promo' | 'PriceDetails' | 'Reviews' | 'About' | 'Offices';

const INSURANCE_INFO_MAP: Record<InsuranceInfoType, string> = {
  Promo: 'Подарки от Сравни.ру',
  Reviews: 'Отзывы и рейтинги',
  About: 'О компании',
  Offices: 'Офисы урегулирования',
  PriceDetails: 'Детализация стоимости',
};

export interface IEventInsuranceInfo {
  type?: InsuranceInfoType;
  giftName?: string;
}

/**
 * Событие передается при нажатии на раскр меню внутри блока "Подробнее о страховой"
 */
export const eventInsuranceInfo = ({ type, giftName }: IEventInsuranceInfo): IInitialEvent => ({
  event: 'adEvent',
  eventAction: 'Информация о страховой',
  eventLabel: type ? INSURANCE_INFO_MAP[type] : `Подарки от Сравни.ру - ${giftName}`,
  eventCategory: 'ОСАГО',
  eventValue: undefined,
});

/**
 * Событие срабатывает на выдаче при появлении новых алертов на карточках
 */
export const eventPropositionAlerts = (color: string, companyName: string): IInitialEvent => ({
  event: 'adEvent',
  eventAction: 'Цветной блок',
  eventLabel: [color, companyName],
  eventCategory: 'ОСАГО',
  eventValue: undefined,
});

export interface IEventPolicyDraft {
  companyName: string;
  isProlongation: boolean;
  propositionType: TSaleType;
}

/**
 * Событие отправляется при клике пользователем "Проект вашего полиса"
 */
export const eventPolicyDraft = ({
  companyName,
  isProlongation,
  propositionType,
}: IEventPolicyDraft): IInitialEvent => ({
  event: 'adEvent',
  eventAction: 'Кнопка проект вашего полиса',
  eventLabel: [companyName, `Пролонгация - ${isProlongation}`, propositionType],
  eventCategory: 'ОСАГО',
  eventValue: undefined,
});

export interface IEventMoveToPayment {
  companyName: string;
  price: Nullable<number>;
  isProlongation: boolean;
  saleType: TSaleType;
  isFromPopup: boolean;
}

/**
 * Событие отправляется в момент перехода к оплате
 */
export const eventMoveToPayment = ({
  companyName,
  price,
  isProlongation,
  saleType,
  isFromPopup,
}: IEventMoveToPayment): IInitialEvent => ({
  event: 'mainEvent' as const,
  eventAction: 'Переход к оплате',
  eventLabel: [
    companyName,
    isProlongation ? 'Пролонгация' : undefined,
    saleType,
    isFromPopup ? 'Кнопка' : undefined,
  ].filter(isDefined),
  eventCategory: 'ОСАГО',
  eventValue: price ?? undefined,
});

export interface IDateFilter {
  filterType: string;
  companiesValue: number;
}

/**
 * Событие отправляется при применении фильтра по датам, когда клиент получил проброс
 */
export const eventDateFilterInForwardingProposition = ({ filterType, companiesValue }: IDateFilter): IInitialEvent => ({
  event: 'adEvent' as const,
  eventAction: 'Фильтры по датам',
  eventLabel: [filterType, companiesValue],
  eventCategory: 'ОСАГО',
  eventValue: undefined,
});

export interface IShowPaymentLink {
  priceWasChanged: boolean;
  companyName: string;
  price: Nullable<number>;
  saleType: TSaleType;
}

/**
 * Событие отправляется в момент показа ссылки на оплату
 */
export const eventShowPaymentLink = ({
  priceWasChanged,
  companyName,
  price,
  saleType,
}: IShowPaymentLink): IInitialEvent => ({
  event: 'mainEvent' as const,
  eventAction: ['Показ ссылки на оплату', priceWasChanged ? 'Перерасчет' : 'Успех'],
  eventLabel: [companyName, saleType],
  eventCategory: 'ОСАГО' as const,
  eventValue: price ?? undefined,
});

export type TSendEventProlongationForwardingResultLabel =
  | 'СК изменила цену'
  | 'СК не отвечает'
  | 'Все СК не отвечают'
  | 'СК изменила срок'
  | 'Ошибка не бэке'
  | 'Пролонгация';

/**
 * Событие отправляется при окончании пуллинга заказа для ветки С
 */
export const eventProlongationForwardingResult = (
  eventLabel: TSendEventProlongationForwardingResultLabel,
  forwardingAmountInfo: string,
): IInitialEvent => ({
  eventAction: 'Повтор проброса',
  event: 'adEvent' as const,
  eventCategory: 'ОСАГО' as const,
  eventLabel: [eventLabel, forwardingAmountInfo],
  eventValue: undefined,
});

/**
 * Событие отправляется при окончании пуллинга заказа для ветки Б
 */
export const eventOrderResult = (eventLabel: TSendEventProlongationForwardingResultLabel): IInitialEvent => ({
  eventAction: 'Ответ ск',
  event: 'adEvent' as const,
  eventCategory: 'ОСАГО' as const,
  eventLabel,
  eventValue: undefined,
});

export type TSendEventFailedPropositionsVisibilityButtonLabel = 'Раскрыть' | 'Скрыть';
/**
 * Событие отправляется при окончании пуллинга заказа
 */
export const eventFailedPropositionsVisibilityButton = (
  eventLabel: TSendEventFailedPropositionsVisibilityButtonLabel,
  eventValue: number,
): IInitialEvent => ({
  eventAction: 'Показать все',
  event: 'adEvent' as const,
  eventCategory: 'ОСАГО' as const,
  eventLabel,
  eventValue,
});

export interface ISelectProduct {
  insuranceCompany: string;
  positionIndex: number;
  isProlongation: boolean;
  isSectionSponsor: boolean;
  isPossiblePay: boolean;
  entry: 'Плитка' | 'Кнопка';
}

/**
 * Событие отправляется при нажатии на "Далее" на поле Выберите компанию, в окне Подробнее о страховой (предложении), в окне Подарки от Сравни.ру
 */
export const eventSelectProduct = ({
  insuranceCompany,
  positionIndex,
  isProlongation = false,
  isSectionSponsor = false,
  isPossiblePay,
  entry,
}: ISelectProduct): IInitialEvent => ({
  event: 'mainEvent',
  eventAction: 'Расчет',
  eventLabel: [
    insuranceCompany,
    `Позиция на выдаче - ${positionIndex + 1}`,
    isSectionSponsor ? 'Метка - Спонсор' : undefined,
    isProlongation ? 'Метка - Ваша страховая' : undefined,
    Number(isPossiblePay),
    entry,
  ].filter(isDefined),
  eventValue: undefined,
});

export interface IPropositionEvent {
  propositionStatus: 'Успех' | 'Расчет недоступен' | 'Ошибка бэка';
}

/**
 * Событие срабатывает на выдаче
 */
export const eventPropositions = ({ propositionStatus }: IPropositionEvent): IInitialEvent => ({
  event: 'mainEvent',
  eventAction: ['Показ выдачи', propositionStatus],
  eventLabel: undefined,
  eventValue: undefined,
});

/**
 * Событие отправляется при нажатии на кнопку "Редактировать"
 */
export const eventMoveToEdit = (): IInitialEvent => ({
  event: 'mainEvent',
  eventCategory: 'ОСАГО',
  eventAction: 'Переход к редактированию',
  eventLabel: 'Редактировать',
  eventValue: undefined,
});

/**
 * Событие отправляется при нажатии на кнопку "Попробовать еще раз", когда при попытке пуллинга СК на заказе, произошла ошибка
 */
export const eventRetryOrderAfterError = (): IInitialEvent => ({
  event: 'adEvent',
  eventCategory: 'ОСАГО',
  eventAction: 'Попробовать еще раз',
  eventLabel: undefined,
  eventValue: undefined,
});

const MAP_VEHICLE_TYPE_LANDING: Record<VehicleType, string> = {
  car: 'Лендинг ОСАГО',
  motorcycle: 'МотоЛендинг ОСАГО',
};

/**
 * Событие загрузки лендинга
 */
export const eventLanding = (isAuth: boolean, vehicleType: VehicleType) => ({
  event: 'adEvent' as const,
  eventCategory: 'ОСАГО' as const,
  eventAction: MAP_VEHICLE_TYPE_LANDING[vehicleType],
  eventLabel: isAuth ? 'Авторизован' : 'Не авторизован',
});

const MAP_VEHICLE_TYPE_SWITCHER: Record<VehicleType, string> = {
  car: 'Авто',
  motorcycle: 'Мото',
};

/**
 * Свитчер ГРЗ переключает вариант окошка для ГРЗ либо для авто А 000 АА 00, либо для мото 0000 АА 00
 */
export const eventLandingVehicleSwitcher = (vehicleType: VehicleType) => ({
  event: 'mainEvent' as const,
  eventCategory: 'ОСАГО' as const,
  eventAction: 'Свитчер ГРЗ',
  eventLabel: MAP_VEHICLE_TYPE_SWITCHER[vehicleType],
  eventValue: undefined,
});

/**
 * Событие показа блоков в авторизованном режиме.
 */
export const eventShowAuthCard = (funnelType: 'Быстрый расчет' | 'Быстрое продление') => ({
  event: 'mainEvent' as const,
  eventAction: 'Авторизованный режим',
  eventLabel: funnelType,
});

type TLandingClick = FlowType | 'GRZ';

const MAP_LANDING_CLICK: Record<TLandingClick, string> = {
  GRZ: 'Клик на ввод ГРЗ',
  [FlowType.Prolongation]: 'Клик на Продлить полис',
  [FlowType.Calculation]: 'Клик на Рассчитать цену',
};

export const eventLandingClick = (eventLabel: TLandingClick) => ({
  event: 'mainEvent' as const,
  eventAction: 'Клик на лендинге',
  eventLabel: MAP_LANDING_CLICK[eventLabel],
  eventValue: undefined,
});

type TLandingShowPolicies = {
  eventLabelText: 'Показ сохраненных расчетов' | 'Показ полисов к продлению';
  eventLabelAmount: number;
  eventValue: Array<string | undefined>;
};

export const eventLandingShowPolicies = ({ eventLabelText, eventLabelAmount, eventValue }: TLandingShowPolicies) => ({
  event: 'mainEvent' as const,
  eventAction: 'Показ на лендинге',
  eventLabel: [eventLabelText, eventLabelAmount],
  eventValue: eventValue.filter(isDefined),
});

type TCalculation = {
  eventLabel: 'По номеру' | 'Выбрать марку' | 'Быстрый расчет' | 'Быстрое продление' | 'Из проверки ДК';
  regNumber?: string;
};

export const eventCalculation = ({ eventLabel, regNumber }: TCalculation) => ({
  event: 'mainEvent' as const,
  eventAction: 'Рассчитать',
  eventLabel,
  leadID: [regNumber && `ГРЗ - ${regNumber}`, `Дата - ${formatDate.toClientFromDate(new Date())}`].filter(isDefined),
});

export const eventAddDriverForm = (eventLabel: number) => ({
  event: 'adEvent' as const,
  eventAction: 'Добавить водителя',
  eventLabel,
  eventValue: undefined,
});

export const eventSubmitDriverForm = (eventLabel: [number, 'Продолжить' | 'Водитель']) => ({
  event: 'mainEvent' as const,
  eventAction: 'Водители',
  eventLabel,
  eventValue: undefined,
});
export const eventSubmitOwnerForm = (eventLabel: 'Страхователь' | 'Ваши контакты' | 'Выдача') => ({
  event: 'mainEvent' as const,
  eventAction: 'Собственник',
  eventLabel,
  eventValue: undefined,
});
export const eventSubmitInsurerForm = () => ({
  event: 'mainEvent' as const,
  eventAction: 'Страхователь',
  eventLabel: 'Продолжить',
  eventValue: undefined,
});
export const eventSubmitContactsForm = () => ({
  event: 'mainEvent' as const,
  eventAction: 'Контакты',
  eventLabel: 'Продолжить',
  eventValue: undefined,
});
export const eventSubmitOtpCode = () => ({
  event: 'mainEvent' as const,
  eventAction: 'Подтверждение телефона',
  eventLabel: 'Подтвердить',
  eventValue: undefined,
});
export const eventSubmitSendSmsCode = () => ({
  event: 'mainEvent' as const,
  eventAction: 'Оформление',
  eventLabel: 'Телефон',
  eventValue: undefined,
});

type TSubmitCarInfo = {
  brand: string | undefined;
  model: string | undefined;
};
export const eventSubmitCarInfo = ({ brand, model }: TSubmitCarInfo) => ({
  event: 'mainEvent' as const,
  eventAction: 'Автомобиль',
  eventLabel: [`Марка - ${brand}`, `Модель - ${model}`],
  eventValue: undefined,
});
export const eventAuthSmsCode = () => ({
  event: 'mainEvent' as const,
  eventAction: 'Оформление',
  eventLabel: 'Телефон',
  eventValue: undefined,
});
export const eventResendSmsCode = () => ({
  event: 'adEvent' as const,
  eventAction: 'Отправить код повторно',
  eventValue: undefined,
});

type TEventAuthStatus = {
  /*
  - 1 - Лендинг (вкладка пролонгация)
  - 2 - Тихая авторизация во flow на анкете
  - 3 - Авторизация на Саммари
  - 4 - Авторизация пролонгации через поп-апп после ввода ГРЗ
  - 5 - Авторизация Success page
 */
  authType: 1 | 2 | 3 | 4 | 5;
  actionType: 'Запрос' | 'Результат';
  result?:
    | 'Успех'
    | 'Не успех'
    | 'Половина успеха - Окно заблокировано'
    | 'Половина успеха - Окно закрыто пользователем'
    | 'Половина успеха - Ошибка авторизации'
    | 'Половина успеха - Техническая ошибка';
};

export const getErrTextForAuthStatus = <T>(err: T): TEventAuthStatus['result'] => {
  if (err instanceof AuthWindowBlockedError) return 'Половина успеха - Окно заблокировано';
  if (err instanceof AuthWindowClosedError) return 'Половина успеха - Окно закрыто пользователем';
  if (err instanceof AuthError) return 'Половина успеха - Ошибка авторизации';
  return 'Половина успеха - Техническая ошибка';
};

export const eventAuthStatus = ({ actionType, authType, result }: TEventAuthStatus) => ({
  event: 'adEvent' as const,
  eventAction: 'Авторизация',
  eventLabel: [actionType, authType, result].filter(isDefined),
});

type TEventRaffleBanner = {
  /*
    Главная - баннер на странице sravni.ru/
    Лендинг - баннер на лэндинге
    Расчет - баннер на выдаче
    Сенкью - баннер на сенкью пейдж
    Разводящая - баннер на разводящей странице
    Для Третьего типа взаимодействия принимает значение:
    Мобилка - клиент перешел на страницу розыгрыша через мобильное приложение
    Для остальных:
    0 - клиент перешел на страницу розыгрыша через сайт
   */
  place: 'Главная' | 'Лендинг' | 'Расчет' | 'Сенкью' | 'Разводящая' | 'Мобилка' | 'WL' | 0;
  /*
  Подробнее: клик на кнопку "Подробнее" на основной странице sravni.ru, на разводящей странице,  на лендинге или на выдаче
  Зарегистрировать: клик на кнопку "Зарегистрировать" на Сенкью пейдж
  Показ розыгрыша в приложении: клиент зашел на страницу розыгрыша через мобильное приложение
   */
  actionType: 'Подробнее' | 'Зарегистрировать' | 'Показ розыгрыша в приложении';
};

export const eventRaffleBanner = ({ actionType, place }: TEventRaffleBanner) => ({
  event: 'adEvent' as const,
  eventAction: 'Акция февраль 2024',
  eventLabel: [place, actionType],
});

type TEventRaffleLanding = {
  /*
    Купить полис ОСАГО: клик на копку "Купить полис ОСАГО" на главной странице акции
Купить ОСАГО: клик на кнопку "Купить ОСАГО" на главной странице акции
Участвовать в акции: клик на кнопку "участовать в акции" на главное странице акции, кнопка ведет на видос с победителями
Попап вход|Далее: клик на конпку "далее" в попапе входа, но только в случае корректного телефона
Попап вход|Купить полис: клик на конпку "купить полис" в попапе входа
Факт авторизации трекать
Выбор полиса|Подтянулся: факт того, что полис подтянулся
Выбор полиса|Зарегистрировать:  клик по кнопке "Зарегистрировать"в попапе на последнем шаге акции.
                     Если успех то в EventValue ставим 1
                     Если ошибка то в EventValue ставим 0
Выбор полиса|Ввести вручную: клик по ссылке "введите вручную" в попапе когда выбора полиса.
Свой полис|Продолжить: клик по кнопке "Продолжить" в последнем попапе когда вручную ввел номер полиса, в случае успеха
Свой полис|Назад: клик по кнопке "Назад" в последнем попапе когда вручную ввел номер полиса.
   */
  place:
    | 'Купить полис ОСАГО'
    | 'Купить ОСАГО'
    | 'Участвовать в акции'
    | 'Попап вход'
    | 'Зарегистрировать полис'
    | 'Выбор полиса'
    | 'Свой полис';

  actionType?:
    | 'Далее'
    | 'Купить новый полис'
    | 'Подтянулся'
    | 'Зарегистрировать'
    | 'Ввести вручную'
    | 'Продолжить'
    | 'Назад';
  eventValue?: 0 | 1;
};

export const eventRaffleLanding = ({ actionType, place, eventValue }: TEventRaffleLanding) => ({
  event: 'adEvent' as const,
  eventAction: 'Акция февраль 2024',
  eventLabel: [0, place, actionType].filter(isDefined),
  eventValue,
});

export const eventShowEsiaLogin = (step: string) => ({
  event: 'adEvent' as const,
  eventAction: 'Показ плашки госуслуг',
  eventLabel: EVENT_LABEL_NAME[step] ?? '',
});

export const eventClickEsiaLoginButton = (step: string) => ({
  event: 'adEvent' as const,
  eventAction: 'Клик на плашку госуслуг',
  eventLabel: EVENT_LABEL_NAME[step] ?? '',
});

export const eventEsiaLoginError = (step: string) => ({
  event: 'adEvent' as const,
  eventAction: 'Ошибка при подтягивании данных из госуслуг',
  eventLabel: EVENT_LABEL_NAME[step] ?? '',
});

export const eventShowCategoryAlert = (category: string, isPrefilled: boolean) => ({
  event: 'adEvent' as const,
  eventCategory: 'ОСАГО' as const,
  eventAction: 'Показ плашки с категорией ТС',
  eventLabel: `${category}|${isPrefilled ? 'Автоматически' : 'Вручную'}`,
  eventValue: undefined,
});

export const eventShowCategoryField = (categories: string[]) => ({
  event: 'adEvent' as const,
  eventCategory: 'ОСАГО' as const,
  eventAction: 'Показ поля Категория авто',
  eventLabel: categories.join(', '),
  eventValue: undefined,
});

export const eventChooseCategoryField = (category: string) => ({
  event: 'adEvent' as const,
  eventCategory: 'ОСАГО' as const,
  eventAction: 'Выбор категории ТС',
  eventLabel: category,
  eventValue: undefined,
});

export const eventShowKbmField = () => ({
  event: 'mainEvent' as const,
  eventCategory: 'ОСАГО' as const,
  eventAction: 'Показ поля КБМ',
  eventLabel: undefined,
  eventValue: undefined,
});

export const eventGetKbmFieldInfo = (isError: boolean, kbm?: number, errorMessage?: Nullable<string>) => ({
  event: 'adEvent' as const,
  eventCategory: 'ОСАГО' as const,
  eventAction: 'Информация о КБМ',
  eventLabel: `${isError ? 'Ошибка' : 'Успех'}|${isError ? errorMessage : kbm}`,
  eventValue: undefined,
});

export const eventKbmFieldClick = () => ({
  event: 'adEvent' as const,
  eventCategory: 'ОСАГО' as const,
  eventAction: 'Поле КБМ',
  eventLabel: 'Клик по полю КБМ',
  eventValue: undefined,
});

export const eventKbmFieldDefaultModalClick = () => ({
  event: 'adEvent' as const,
  eventCategory: 'ОСАГО' as const,
  eventAction: 'Поле КБМ',
  eventLabel: 'Клик по кнопке Почему такой КБМ?',
  eventValue: undefined,
});

export const eventStartGetKbmFieldInfo = () => ({
  event: 'adEvent' as const,
  eventCategory: 'ОСАГО' as const,
  eventAction: 'Отправили запрос в BAD',
  eventLabel: undefined,
  eventValue: undefined,
});
