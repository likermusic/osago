import { MIN_KBM, DEFAULT_KBM, KbmStatuses } from './KbmDiscount.contants';

export const getKbmStatus = (kbm: Nullable<number | undefined>) => {
  if (!kbm) return KbmStatuses.NotFound;

  if (kbm === MIN_KBM) return KbmStatuses.IsMaxDiscount;
  if (kbm < 1) return KbmStatuses.HasDiscount;
  if (kbm === 1) return KbmStatuses.IsWithoutDiscount;
  if (kbm === DEFAULT_KBM) return KbmStatuses.IsDefaultKbm;

  return KbmStatuses.HasAccidents;
};
