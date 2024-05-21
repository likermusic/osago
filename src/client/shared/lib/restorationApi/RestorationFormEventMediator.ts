import type { IRestorationData, TSubscriptionCallback } from './types';

/**
 * Проблема: Сейчас каждый блок формы неявно обновляет данные других блоков.
 * Решение: Класс реализует механизм передачи сообщений между фичами через кастомные сообщения
 * Данный класс должен развязать фичи и создать единую точку установки начального состояния
 * всей формы для локальных данных и кверей
 * */
export class RestorationFormEventMediator {
  private static RESTORATION_EVENT = 'RESTORATION_EVENT';
  restorationEventFunction: (event: Event) => void;

  // Генерируем кастомное событие из клиентского кода на попытку восстановления данных в анкету
  static generateEvent = (params: IRestorationData) => {
    window.dispatchEvent(
      new CustomEvent(this.RESTORATION_EVENT, {
        detail: params,
        bubbles: true,
        composed: true,
      }),
    );
  };

  constructor(callBack: TSubscriptionCallback) {
    this.restorationEventFunction = RestorationFormEventMediator._onRestorationEventFired(callBack);
  }

  // Логика восстановления подписывается на восстановление данных если пришло событие подписывается тут
  subscribeOnRestoration = () => {
    window.addEventListener(RestorationFormEventMediator.RESTORATION_EVENT, this.restorationEventFunction);
  };

  // Отписаться от событий восстановления
  unsubscribeOnRestoration = () => {
    window.removeEventListener(RestorationFormEventMediator.RESTORATION_EVENT, this.restorationEventFunction);
  };

  static _isRestorationEvent = (event: Event): event is CustomEvent<IRestorationData> =>
    event.type === this.RESTORATION_EVENT;

  static _onRestorationEventFired = (callBack: TSubscriptionCallback) => (event: Event) => {
    if (this._isRestorationEvent(event)) {
      callBack(event.detail);
    }
  };
}
