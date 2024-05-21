import type React from 'react';

export type TInfoItem = {
  title: string;
  description: string[];
};

export interface IBonusInfoBody {
  aboutText?: string;
  alertText?: string;
  logoUrl?: string;
  infoList: TInfoItem[];
  fullRulesLinkUrl?: string;
  shortDescription: string;
}

export interface IBonusDetails {
  detail: IBonusInfoBody;
  visible: boolean;
  onClose: (e: React.SyntheticEvent) => void;
}

export enum IPromoTypes {
  ivi = 'Ivi',
  gazprom = 'Gazprom',
  yandexHealth = 'YandexHealth',
  els24 = 'Els24',
  astroVolga = 'AstroVolga',
  fitService = 'FitService',
  svyaznoyOsago = 'SvyaznoyOsago',
  svyaznoyNative = 'SvyaznoyNative',
  fire = 'Fire',
  okko = 'Okko',
  sber = 'Sber',
  ndflka = 'NDFLka',
  rgsGiftBase = 'RgsGiftBase',
  rgsGiftExtended = 'RgsGiftExtended',
}

export interface IBonus {
  advertText?: string;
  detail: IBonusInfoBody;
  logoBigLink: string;
  name: IPromoTypes;
  title: string;
  subtitle: string;
}

export interface IBonusesDescription {
  bonuses: IBonus[];
}
