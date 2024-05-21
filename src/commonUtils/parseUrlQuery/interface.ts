export interface IParseUrlQuery {
  // идентификатор калькуляции для восстановления выдачи
  calculationHash: string;

  // хэш рассчета, никто не знает зачем он нужен, приходит вместе с searchId
  hash: string;

  // идентификатор заказа или продления для восстановления выдачи
  orderOrProlongationHash: string;
  // идентификатор заказа для восстановления выдачи
  orderHash: string;

  // идентификатор заказа для восстановления summary
  prolongationHash: string;

  // идентификатор рассчета для восстановления выдачи
  searchId: string;

  // Заполнить анкету данными по тачке из номера машины
  regNumberToken: string;

  // ??
  isOrderApproved: boolean;

  // промокод на скидку
  benefitCode: string;

  // восстановить данные и session storage
  sessionQuery: string;

  // ГРЗ для парсинга на анкете
  autoNumber: string;

  // ГРЗ для подстановки в инпут на лендинге
  platenumber: string;

  // Тип модалки('prevWinner' | 'registration'), чтобы открывалась нужная при переходе по ссылке на лендинг розыгрыша
  raffleModalType: string;
}
