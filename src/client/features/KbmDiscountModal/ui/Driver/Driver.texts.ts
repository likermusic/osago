import { KbmStatuses, getDiscountPercentByKbm, getKbmStatus } from 'entities/KbmDiscount';

type TTexts = Record<keyof typeof KbmStatuses, { colorHelper: string; label: string }>;

export const getDiscountTextByKbm = (isSelected: boolean, kbm: number, hasMaxKbm: boolean) => {
  const discountPercent = getDiscountPercentByKbm(kbm);
  const kbmStatus = getKbmStatus(kbm);

  const hasMaxKbmAndDefaultKbmColor = hasMaxKbm ? 'h-color-O200' : 'h-color-D60';

  const texts: TTexts = {
    [KbmStatuses.IsMaxDiscount]: {
      colorHelper: isSelected ? 'h-color-G200' : 'h-color-D20',
      label: `максимальная скидка ${discountPercent}%`,
    },
    [KbmStatuses.HasDiscount]: {
      colorHelper: isSelected ? 'h-color-G200' : 'h-color-D20',
      label: `cкидка ${discountPercent}%`,
    },
    [KbmStatuses.IsWithoutDiscount]: { colorHelper: isSelected ? 'h-color-D60' : 'h-color-D20', label: 'без скидки' },
    [KbmStatuses.IsDefaultKbm]: {
      colorHelper: isSelected ? hasMaxKbmAndDefaultKbmColor : 'h-color-D20',
      label: `надбавка ${discountPercent}%`,
    },
    [KbmStatuses.HasAccidents]: {
      colorHelper: isSelected ? 'h-color-O200' : 'h-color-D20',
      label: `надбавка ${discountPercent}% Были ДТП`,
    },
    [KbmStatuses.NotFound]: {
      colorHelper: 'h-color-D20',
      label: ``,
    },
  };

  return texts[kbmStatus];
};
