export type TWhiteLabelState = {
  wl: {
    /** @description канал */
    medium?: Nullable<string>;
    /** @description источник */
    source?: Nullable<string>;
    /** @description компания */
    campaign?: Nullable<string>;
    /** @description Контент. */
    content?: Nullable<string>;
    /** @description Поисковый запрос. */
    term?: Nullable<string>;
    /** @description google id */
    uaClientId?: Nullable<string>;
    /** @description доп метка */
    subId?: Nullable<string>;
    /**
     * Format: int32
     * @description партнерские данные (Id аффилиата по hasoffers)
     */
    affId?: number | null;
    /** @description партнерские данные (Id/externalId виджета по админке партнерки) */
    affSub1?: Nullable<string>;
    /** @description партнерские данные */
    affSub2?: Nullable<string>;
    /** @description партнерские данные */
    affSub3?: Nullable<string>;
    /** @description партнерские данные */
    affSub4?: Nullable<string>;
    /** @description партнерские данные */
    affSub5?: Nullable<string>;
    /** @description партнерские данные (Id площадки) */
    sourceId?: Nullable<string>;
    /** @description партнерские данные (Id клика перехода на сравни.ру с паретнерской площадки) */
    transactionId?: Nullable<string>;
    /**
     * Format: int32
     * @description партнерские данные (Id оффера по hasoffers)
     */
    offerId?: number | null;
    /** @description Регион агента (по КЛАДР) */
    agentRegion?: Nullable<string>;
    /** @description Id агента в системе Альфа страхования */
    alfaUserId?: Nullable<string>;
    /** @description Id агента в системе Ренесанс страхования */
    renessansUserId?: Nullable<string>;
    themePalette?: string;

    /** @description показывать все блоки лендинга */
    isFullLanding?: boolean;
    /** @description показывать вопросы/ответы на лендинге */
    isQuestionnaireOnLanding?: boolean;
  };
  nonPartnerWl: boolean;
};
