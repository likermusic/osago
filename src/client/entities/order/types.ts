import type { IDetailAlert } from 'shared/types/IAlert';
import type { ICalculationProposition, IOrderProposition } from 'shared/types/ICardProposition';

export type TOrderStatus =
  // Начальный статус, когда еще не запустился пуллинг
  | 'initial'
  // Идет пуллинг, заказ или пробросы. Такой статус, только когда пуллится сам заказ(несмотря на пробросы)
  | 'loading'
  // Если успешно закончился пуллинг(без ошибок) и компания ответила положительно
  | 'success'
  // Если неуспешно закончился сам пуллинг(при ошибках запросов пулллинга)
  | 'error'
  // Если цена на заказе больше цены на расчете(выбранная страховая готова к оплате)
  | 'priceChanged'
  // Если дата отличается от даты выбранной пользователем(выбранная страховая готова к оплате)
  | 'dateChanged'
  // То же самое, что 'priceChanged' и 'dateChanged' только вместе
  | 'priceAndDateChanged'
  // Если выбранная страховая ответила отказом, но есть пробросы
  | 'rejected'
  // Если выбранная страховая ответила отказом и нет пробросов
  | 'allRejected';

export interface OrderState {
  // Основной orderHash
  orderHash: Nullable<string>;
  /*
   * уникальный хеш заказа
   * создается через nanoId, чтобы перезапускать заказ если бек вернул тот же orderHash например при рестарте заказа
   */
  orderUniqueHash: Nullable<string>;
  order: Nullable<IOrderProposition>;
  // Статус заказа
  orderStatus: TOrderStatus;
  // Пробросы
  forwardingPropositions: ICalculationProposition[];
  // Флаг, что успешный пуллинг прошел
  isOrderCompleted: boolean;
  // Флаг, отвечает за показываем ли пробросы на ui
  shouldShowForwardingPropositions: boolean;
  // Алерты, выводятся над заказом. Приходят с бека
  alerts: IDetailAlert[];
}

export type TGetOrderHash = Pick<OrderState, 'orderHash' | 'orderUniqueHash'>;

export type TGetOrderCalculations = Pick<
  OrderState,
  | 'forwardingPropositions'
  | 'order'
  | 'orderStatus'
  | 'isOrderCompleted'
  | 'shouldShowForwardingPropositions'
  | 'alerts'
>;

export type TForwardingPropositionsMappedByDate = Record<string, OrderState['forwardingPropositions']>;
