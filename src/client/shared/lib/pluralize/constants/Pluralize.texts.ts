type PluralizeTextsKey = 'age' | 'drivers' | 'driversGenitive' | 'presents' | 'offices' | 'payments';

export const PluralizeTexts: Record<PluralizeTextsKey, [string, string, string]> = {
  age: ['год', 'года', 'лет'],
  drivers: ['водитель', 'водителя', 'водителей'],
  driversGenitive: ['водителя', 'водителей', 'водителей'], // Родительный падеж
  presents: ['подарок', 'подарка', 'подарков'],
  offices: ['офис', 'офиса', 'офисов'],
  payments: ['платёж', 'платежа', 'платежей'],
};
