import documentPayment from 'shared/assets/icons/creditCardAndDocument.svg';
import emailDocument from 'shared/assets/icons/sendPoliceToPhone.svg';
import variants from 'shared/assets/icons/variants.svg';

import type { TStepItem } from '../../types';

export const HowToOrderSteps: TStepItem[] = [
  {
    title: 'Выбор',
    text: 'Выберите предложение, которое больше нравится по цене или другим параметрам',
    IconComponent: variants,
  },
  {
    title: 'Оплата',
    text: 'Оплатите полис банковской картой или СБП на сайте Сравни Без комиссии и переплат',
    IconComponent: documentPayment,
  },
  {
    title: 'Полис на e-mail',
    text: 'Полис будет зарегистрирован в  ГИБДД, РСА, страховой компании',
    IconComponent: emailDocument,
  },
];
