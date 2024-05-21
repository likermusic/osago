export type TKbmFieldStatus =
  | 'networkError' // Если запрос за кбмом водителя с ошибкой
  | 'noData' // Если неправильно заполнены поля нужные для получения кбм(то есть не прошла валидация)
  | 'loading' // Если идет запрос за кбмом
  | 'notFound' // Если кбм не найден(если он 0, undefined, null)
  | 'success'; // Если все ок и получили кбм по водителю

export type TKbmFieldWithAlert =
  | {
      status: TKbmFieldStatus;
      value: Nullable<number>;
    }
  | undefined;
