import { getKbmDiscountInfo } from './getKbmDiscountInfo';
import { KbmStatuses } from './KbmDiscount.contants';

export const getDriverKbmDescription = (kbm: Nullable<number | undefined>) => {
  const { status, discountPercent } = getKbmDiscountInfo(kbm);

  const DESCRIPTIONS = {
    [KbmStatuses.HasAccidents]: `Надбавка\u00A0${discountPercent}%`,
    [KbmStatuses.IsDefaultKbm]: `Надбавка\u00A0${discountPercent}%`,
    [KbmStatuses.IsWithoutDiscount]: `Без\u00A0скидки`,
    [KbmStatuses.HasDiscount]: `Скидка\u00A0${discountPercent}%`,
    [KbmStatuses.IsMaxDiscount]: `Скидка\u00A0${discountPercent}%`,
    [KbmStatuses.NotFound]: ``,
  };

  return DESCRIPTIONS[status];
};
