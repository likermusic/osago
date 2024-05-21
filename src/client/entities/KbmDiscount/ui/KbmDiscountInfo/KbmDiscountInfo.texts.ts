import { KbmStatuses } from '../../lib';

export interface IKbmDiscountInfo {
  color: 'R100' | 'O100' | 'G100' | 'D30';
  subtitle: string;
  title: string;
}

export const getKbmDiscountInfoByStatuses = (
  percent: Nullable<number | undefined>,
  status: KbmStatuses,
): IKbmDiscountInfo => {
  const INFO: Record<KbmStatuses, IKbmDiscountInfo> = {
    [KbmStatuses.HasAccidents]: {
      color: 'R100',
      subtitle: 'За аварийность',
      title: `Надбавка ${percent}%`,
    },
    [KbmStatuses.IsDefaultKbm]: {
      color: 'O100',
      subtitle: 'Нет истории безаварийности',
      title: `Надбавка ${percent}%`,
    },
    [KbmStatuses.IsWithoutDiscount]: {
      color: 'O100',
      subtitle: 'За безаварийность',
      title: 'Без скидки',
    },
    [KbmStatuses.HasDiscount]: {
      color: 'G100',
      subtitle: 'За безаварийность',
      title: `Применили скидку ${percent}%`,
    },
    [KbmStatuses.IsMaxDiscount]: {
      color: 'G100',
      subtitle: 'За безаварийность',
      title: `Применили скидку ${percent}%`,
    },
    [KbmStatuses.NotFound]: {
      color: 'D30',
      subtitle: 'Не найдено',
      title: ``,
    },
  };

  return INFO[status];
};
