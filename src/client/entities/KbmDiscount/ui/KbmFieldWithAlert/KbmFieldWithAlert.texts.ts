import type { AlertProps } from '@sravni/react-design-system/dist/types/components/Alert';

import type { TKbmFieldStatus } from 'shared/types/TKbmFieldWithAlert';

import { KbmStatuses } from '../../lib';

export interface IKbmFieldInfo {
  hint?: string;
  fieldTitle: string | undefined;
  alertInfo:
    | null
    | {
        color: AlertProps['color'];
        text: string;
      }
    | {
        color: AlertProps['color'];
        text: string;
        link: string;
      };
}

export const KbmFieldWithAlertTexts = {
  tooltipInfo:
    'Скидка за стаж или КБМ — параметр безаварийного вождения. Чем меньше водитель попадает в ДТП, в которых он виноват, тем ниже его КБМ и цена полиса',
  label: 'КБМ (безаварийность) водителя',
  labelShort: 'КБМ (безаварийность)',
};

export const getKbmDiscountInfoByFieldStatuses = (
  kbm: Nullable<number | undefined>,
  percent: Nullable<number | undefined>,
  kbmStatus: KbmStatuses,
  fieldStatus: TKbmFieldStatus,
) => {
  const INFO_SUCCESS: Record<KbmStatuses, IKbmFieldInfo> = {
    [KbmStatuses.HasAccidents]: {
      fieldTitle: `${kbm} (Надбавка ${percent}%)`,
      alertInfo: {
        color: 'red',
        text: `Водитель часто попадал в аварии, цена с ним будет дороже`,
      },
    },
    [KbmStatuses.IsDefaultKbm]: {
      fieldTitle: `${kbm} (Надбавка ${percent}%)`,
      alertInfo: {
        color: 'orange',
        text: 'Пожалуйста, проверьте данные водителя, чтобы не переплачивать. Если все верно, продолжайте. ',
        link: 'Почему такой КБМ?',
      },
    },
    [KbmStatuses.IsWithoutDiscount]: {
      fieldTitle: `${kbm} (Без скидки)`,
      alertInfo: {
        color: 'orange',
        text: 'Молодой водитель со стажем до 1 года. Цена с ним будет дороже',
      },
    },
    [KbmStatuses.HasDiscount]: {
      fieldTitle: `${kbm} (Скидка ${percent}%)`,
      alertInfo: {
        color: 'green',
        text: `Скидка ${percent}%  за безаварийный стаж найдена. Данные заполнены верно`,
      },
    },
    [KbmStatuses.IsMaxDiscount]: {
      fieldTitle: `${kbm} (Скидка ${percent}%)`,
      alertInfo: {
        color: 'green',
        text: `Скидка ${percent}%  за безаварийный стаж найдена. Данные заполнены верно`,
      },
    },
    [KbmStatuses.NotFound]: {
      fieldTitle: 'Рассчитаем после анкеты',
      alertInfo: null,
    },
  };
  const INFO: Record<TKbmFieldStatus, IKbmFieldInfo> = {
    loading: {
      fieldTitle: 'Ищем скидки....',
      alertInfo: null,
    },
    networkError: {
      alertInfo: null,
      fieldTitle: 'Рассчитаем далее',
    },
    noData: {
      alertInfo: null,
      fieldTitle: '',
      hint: 'Заполните анкету выше, чтобы узнать КБМ',
    },
    notFound: {
      alertInfo: null,
      fieldTitle: 'Рассчитаем далее',
    },
    success: INFO_SUCCESS[kbmStatus],
  };

  return INFO[fieldStatus];
};
