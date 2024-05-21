import type { ICompanyPropositionInfo } from 'shared/types/ICompanyPropositionInfo';

import type { IDetailAlert } from './IAlert';
import type { IOfferTag } from './IOfferTag';
import type { TPropositionDetail } from './IPropositionDetail';

export interface IDescription {
  title: string;
  description: string;
}

export type TOrderPropositionStatus =
  // Когда этот проброс или заказ пуллится
  | 'loading'
  // Когда этот проброс или заказ можно оплатить
  | 'success'
  // Когда этот проброс или заказ можно оплатить, но поменялась дата
  | 'dateChanged'
  // Когда по пробросу или заказу страховая отказала
  | 'rejected'
  // Когда ошибка при пуллинге проброса или заказа
  | 'error';

export interface ICardProposition {
  // Уникальный id для рендера
  id: string;
  // Актуальная цена(на заказе может отличаться от searchPrice, тк как изменилась при пуллинге)
  price: Nullable<number>;

  // Теги внутри карточки
  tags: IOfferTag[];
  // Апсейлы и так далее
  alerts: IDetailAlert[];
  // Тошо сверху теги
  absoluteTags: IOfferTag[];

  // Преимущества в середине карточки
  advantages: IDescription[];
  // Подробная инфа о компании, когда кликаешь на карточку(модалка)
  description: Nullable<TPropositionDetail>;

  // Если продлевается в этой компании
  isProlongation?: boolean;
  // Дата начала полиса, может отличаться от выбранной пользователем(ну и просто выводится в карточке проброса)
  startDate: Nullable<string>;
  // Хеш расчета (в ордере нужен для перезапуска заказа)
  calcHash: Nullable<string>;
}

export interface ICalculationProposition extends ICardProposition {
  isSectionSponsor?: boolean;
  // Пока какая-то непонятная фигня(либо companyId, либо osagoId), используется для создания заказа
  productId: number;
  // Инфа о компании
  company: ICompanyPropositionInfo;
}

export interface IOrderProposition extends ICardProposition {
  // Цена, которая была на выдаче(по идее должно быть равно selectedProposition.price)
  searchPrice: Nullable<number>;
  // ССылка на оплату
  paymentUrl: Nullable<string>;
  // Хэш конкретной карточки(на случай если их будет несколько)
  orderHash: Nullable<string>;
  // Пока какая-то непонятная фигня(либо companyId, либо osagoId), используется для создания заказа
  productId: Nullable<number>;
  // Инфа о компании
  company: Nullable<ICompanyPropositionInfo>;

  // Пока не выводим на заказе, но может понадобиться
  isSectionSponsor?: boolean;
  // Выводим зачеркнутую цену
  isPriceChanged: boolean;
  // На этом статусе строим отображение каждой карточки
  orderPropositionStatus: TOrderPropositionStatus;
  // Черновик полиса
  draftFullUrl: Nullable<string>;
}
