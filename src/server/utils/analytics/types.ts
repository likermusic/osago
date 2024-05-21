export interface OsagoUtmQuery {
  medium?: string; // канал
  source?: string; // источник
  campaign?: string; // компания
  content?: string; // Контент.
  term?: string; // Поисковый запрос.
  uaClientId?: string; // google id
  ymClientId?: string; // yandex id
}

export interface OsagoPartnerQuery {
  medium?: string; // канал
  source?: string; // источник
  campaign?: string; // компания
  content?: string; // Контент.
  term?: string; // Поисковый запрос.
  uaClientId?: string; // google id
  ymClientId?: string; // yandex id
  subId?: string; // доп метка
  affId?: number; // партнерские данные (Id аффилиата по hasoffers)
  affSub1?: string; // партнерские данные (Id/externalId виджета по админке партнерки)
  affSub2?: string; // партнерские данные
  affSub3?: string; // партнерские данные
  affSub4?: string; // партнерские данные
  affSub5?: string; // партнерские данные
  sourceId?: string; // партнерские данные (Id площадки)
  transactionId?: string; // партнерские данные (Id клика перехода на сравни.ру с паретнерской площадки)
  offerId?: number; // партнерские данные (Id оффера по hasoffers)
}
