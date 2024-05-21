// При необходимости дополнить другими страницами

type TVirtualPage = 'Расчет' | 'Заказ' | 'Саммари' | 'Сенкью' | 'Лендинг';

export const PAGE_TO_VIRTUAL_PAGE_RECORD: Record<string, TVirtualPage> = {
  '/osago': 'Лендинг',
  '/osago/propositions': 'Расчет',
  '/osago/success': 'Сенкью',
};
