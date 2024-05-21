import type { BadgeProps } from '@sravni/react-design-system/lib/Badge';
import type React from 'react';

import type { ICompanyPropositionInfo, IOfferTag } from 'shared/types';

type TAdvantage = {
  /* Заголовок преимущества */
  title: string;
  /* Описание преимущества */
  description: string;
};

export interface IPropositionHeaderCommon {
  /* Данные по компании */
  company: Nullable<ICompanyPropositionInfo>;
  /* Цена полиса */
  price: Nullable<number>;
  /* Цена полиса в начале расчета*/
  searchPrice?: Nullable<number>;
  /* Слот для фич в хедере */
  headerActionChildren?: JSX.Element;
  /* Свойства badge под ценой*/
  headerBadge?: Nullable<BadgeProps>;
}

export interface IPropositionHeaderMain extends IPropositionHeaderCommon {
  /* Массив преимуществ */
  advantages: Nullable<TAdvantage[]> | undefined;
}

export interface IPropositionHeaderWithDate extends IPropositionHeaderCommon {
  /* Дата начала полиса */
  startDate: string;
  /* Слот для алертов внутри карточки*/
  tags: Nullable<IOfferTag[]>;
  actionChildren?: Nullable<React.ReactNode>;
}

export interface IPropositionCardCommon {
  /* Является ли компания спонсором  */
  isSectionSponsor?: boolean;
  /* Является ли продлением */
  isProlongation?: boolean;
  /* Класс для блока обертки над children и actionChildren*/
  classNameContainer?: string;
  /* Массив алертов*/
  /* Слот для кликабельных алертов над карточка */
  absoluteTags: React.ReactNode;
  /* Слот для алертов внутри карточки*/
  tags: Nullable<IOfferTag[]>;
  /* Визуальное отображение карточки при дизейбле */
  isDisabled?: boolean;
  /* Отмечает активную карточку рамкой другого цвета */
  isActive?: boolean;
  /* Клик по всей области карточки */
  onCardClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export interface IPropositionCardMain extends IPropositionCardCommon, IPropositionHeaderMain {}

export interface IPropositionCardWithDate extends IPropositionCardCommon, IPropositionHeaderWithDate {}

export interface IPropositionCardFailed {
  /* Имя компании */
  companyName: string;
  /* Ссылка на логотип компании */
  logoLink: string;
  /* Дополнительный текст */
  subtitle?: string;
  isActive?: boolean;
}

export interface IPropositionCardLoading {
  /* Имя компании */
  companyName?: string;
  /* Ссылка на логотип компании */
  logoLink?: string;
}

export type TSortProposition = 'priceASC' | 'priceDESC' | 'bestSravniReviews';
