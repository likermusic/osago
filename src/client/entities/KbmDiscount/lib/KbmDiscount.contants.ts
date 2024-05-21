export const DEFAULT_KBM = 1.17;
export const MIN_KBM = 0.46;
export const MAX_KBM = 3.92;

export const enum KbmStatuses {
  IsMaxDiscount = 'IsMaxDiscount',
  HasDiscount = 'HasDiscount',
  IsWithoutDiscount = 'IsWithoutDiscount',
  IsDefaultKbm = 'IsDefaultKbm',
  HasAccidents = 'HasAccidents',
  NotFound = 'NotFound',
}
