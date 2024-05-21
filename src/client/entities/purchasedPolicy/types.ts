import type { IDetailAlert } from 'shared/types/IAlert';

export interface PolicyInfoResult {
  company?: ICompanyResult;
  contractNumber?: string; // Номер полиса ОСАГО
  email?: string; // Email пользователя
  name?: string; // Имя пользователя
  price: number; // Цена
  policyBlankLink?: string; // Ссылка на pdf полиса
  policyDocumentsLink?: string; // Ссылка на zip архиф с документами полиса(чек, заявление, прочее)
  userId?: number; // UserId
  cashBackSuccess?: IDetailAlert[];
}

export interface PolicyLink {
  policyLink: string | null;
  policyNumber: string;
  archiveLink: string | null;
}

export interface PurchasedPolicyState {
  info: Nullable<PolicyInfoResult>;
  policyLink: PolicyLink;
}

export interface IRatingTag {
  /**
   * Название
   */
  name: string;
  /**
   * Описание
   */
  description: string;
  /**
   * Значение
   */
  ratingValue: string;
}

export interface IRating {
  /**
   * Название
   */
  name: string;
  /**
   * Описание
   */
  description: string;
  /**
   * Величина рейтинга
   */
  value: string;
  /**
   * Текстовое описание для значения
   */
  ratingDescription: string;
}

/**
 * Разбивка рейтинга
 */
interface IRatingDetalization {
  star1Count: number;
  star2Count: number;
  star3Count: number;
  star4Count: number;
  star5Count: number;
}

export interface IRatingInfo {
  /**
   * клиентский рейтинг
   */
  clientRating: number;
  /**
   * экспертный рейтинг
   */
  expertRating: number;
  clientRatingDetalization: IRatingDetalization;
  /**
   * рейтинг выплат
   */
  paymentRating: string;
  paymentRatingDescription: string;
  positiveTag?: IRatingTag;
  negativeTag?: IRatingTag;
  /**
   * Рейтинги
   */
  ratings: IRating[];
  /**
   * Комментарий к рейтингам (Доля отказов выше среднего...)
   */
  comment: string;
}

export interface ICompanyResult {
  /**
   * ИД компании
   */
  id: number;
  /**
   * Название
   */
  name: string;
  /**
   * Ссылка на лого компании
   */
  logoUrl: string;
  ratingInfo: IRatingInfo;
  /**
   * Лет на рынке
   */
  yearsOnMarket: number;
  /**
   * кол-во отделений
   */
  branchCount: number;
  /**
   * Работает со сравни
   */
  yearsWithSravni: number;
  /**
   * Продано полисов (Пример: "Более 500")
   */
  soldPolicyCount: string;
  /**
   * Продано полисов за вчера (Пример: "5434 полиса")
   */
  soldYesterdayPolicyCount: string;
  /**
   * Год основания компании
   */
  foundationYear: number;
  /**
   * Доля рынка
   */
  marketShare?: number;
}

interface IColumn {
  title?: string;
  description?: string;
}

export interface IAlert extends IColumn {
  /**
   * Результат общей операции сохранения и проверки
   */
  alert: 'None' | 'Green' | 'Red' | 'Orange' | 'Blue';
  action: 'None' | 'GoToDriverStep' | 'DisableUpsale' | 'TakePayUrlOnTheNextStep';
}
