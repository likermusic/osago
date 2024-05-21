import type { OSAGOGATEWAY_API } from '../generatedDTO';

/**
 * Информация по страховой с отделениями
 */
export interface ProviderInfo {
  /**
   * Страховая
   */
  provider: InsuranceProvider;
  /**
   * Информации о количестве отделение
   */
  branches: BranchesInfo;
  /** Номер лицензии */
  osagoLicense: string;
  /**
   * Информация об отзывах
   */
  reviewInfo: ReviewInfo;
}

/**
 * Информация об отзывах
 */
export interface ReviewInfo {
  /**
   * Средний рейтинг компании по ОСАГО
   */
  averageScore: number; // int32
  /**
   * Общий рейтинг СК по всем проудктам
   */
  overallClientRating: number; // int32
  /**
   * Общее количество рецензий
   */
  count: number; // int32
  /**
   * Доступные для отображения
   */
  validCount: number; // int32
  /**
   * Ссылка на страницу просмотра отзывов
   */
  url: string;
}

/**
 * Страховая - владелец продукта
 */
export interface InsuranceProvider {
  /**
   * Id страховой компании
   */
  id: number; // int32
  /**
   * Код страховой компании
   */
  code: string;
  /**
   * Алиас страховой компании
   */
  alias: string;
  /**
   * Название страховой компании
   */
  name: string;
  /**
   * Рейтинг РА
   */
  raRating: string;
  /**
   * Рейтинг РА в числовом представлении
   */
  raRatingNumeric: number; // float
  /**
   * Описание рейтинга РА компании
   */
  raRatingDescription: string;
  /**
   * Обобщённый рейтинг Сравни.ру
   */
  rating: number; // float
}

/**
 * информации о количестве отделение
 */
export interface BranchesInfo {
  /**
   * Удаленное урегулирование
   */
  isRemote: boolean;
  /**
   * Информация по количеству отделений страховой всего
   */
  all: InsuranceBranchesCountModel;
  /**
   * Информация по количеству отделений страховой в регионе получения на ростояние 50 км от центра
   */
  gettingRegion: InsuranceBranchesCountModel;
}

/**
 * Информация по количеству отделений страховой разного типа
 */
export interface InsuranceBranchesCountModel {
  /**
   * Id организации
   */
  organizationId: number; // int32
  /**
   * Кол-во точек общее
   */
  totalCount: number; // int32
  /**
   * Кол-во точек продаж
   */
  salePointCount: number; // int32
  /**
   * Кол-во точек урегулирования убытка
   */
  settlementPointCount: number; // int32
  /**
   * Кол-во точек ремонта
   */
  servicePointCount: number; // int32
}

export type IInsuranceCompaniesRatings = Array<{
  insuranceCompanyId: number;
  reviewRating: {
    insuranceCompanyAnswersCount: number;
    resolvedProblemsCount: number;
    reviewsCount: number;
  };
}>;

export type IReviewsApi = OSAGOGATEWAY_API['/v1/reviews']['get']['responses']['200']['content']['application/json'];

export type LandingReviewItem = {
  companyName: Nullable<string>;
  companyLogoLink: string;
  rating: number;
  title: string;
  comment: string;
  name: string;
  reviewLink: string;
  city: Nullable<string>;
};

interface IInsuranceCompany {
  alias: string;
  license: string;
  logoLink: string;
  greyLogoLink: string;
  mobileLogoLink: string;
  name: string;
  reviewUrl: string;
  clientRating: number;
  companyId: number;
}

export interface IInsuranceCompaniesFullMapBFF {
  [id: number]: IInsuranceCompany;
}
