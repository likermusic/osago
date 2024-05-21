import type { IAbTestingStatistics } from '@sravni/ab-testing-sdk/lib/browser';

export interface PromotionQuery {
  source?: string; // источник
  campaign?: string; // компания
  category?: string;
  sub1?: string;
  sub2?: string;
}

export interface OsagoPartnerQuery {
  medium?: Nullable<string>; // канал
  source?: Nullable<string>; // источник
  campaign?: Nullable<string>; // компания
  content?: Nullable<string>; // Контент.
  term?: Nullable<string>; // Поисковый запрос.
  uaClientId?: Nullable<string>; // google id
  ymClientId?: Nullable<string>; // yandex id
  subId?: Nullable<string>; // доп метка
  affId?: Nullable<number>; // партнерские данные (Id аффилиата по hasoffers)
  affSub1?: Nullable<string>; // партнерские данные (Id/externalId виджета по админке партнерки)
  affSub2?: Nullable<string>; // партнерские данные
  affSub3?: Nullable<string>; // партнерские данные
  affSub4?: Nullable<string>; // партнерские данные
  affSub5?: Nullable<string>; // партнерские данные
  sourceId?: Nullable<string>; // партнерские данные (Id площадки)
  transactionId?: Nullable<string>; // партнерские данные (Id клика перехода на сравни.ру с паретнерской площадки)
  offerId?: Nullable<number>; // партнерские данные (Id оффера по hasoffers)
  setDate?: string;
}

export interface UTM {
  medium?: Nullable<string>;
  source?: Nullable<string>;
  campaign?: Nullable<string>;
  content?: Nullable<string>;
  term?: Nullable<string>;
  uaClientId?: Nullable<string>;
  ymClientId?: Nullable<string>;
  setDate?: string;
}

export interface Base {
  utm: UTM;
  partner: OsagoPartnerQuery;
  promotionQuery: PromotionQuery;
  clid: string | undefined;
}

interface IWLOrderAnalytics {
  partner: OsagoPartnerQuery;
}

export type PreparedAnalytics = Base | IWLOrderAnalytics;

export type TAnalytics = {
  base: Nullable<Base>;
  analyticsABTestStatistics?: Nullable<IAbTestingStatistics>;
};

export type TAppConfig = {
  appType: 'sravni.ru' | 'wl';
  isPaidTraffic: boolean;
  isNewProlongation: boolean;
  gtmKey: string;
  openPaymentLinkInCurrentTab: boolean;
  originalUrl: string;
  benefitCode?: string;
  isMobileAppRaffle: boolean;
};

export interface IAppConfigState {
  analytics: TAnalytics;
  config: TAppConfig;
}

export type TABTestValue = IAbTestingStatistics | null | undefined;
