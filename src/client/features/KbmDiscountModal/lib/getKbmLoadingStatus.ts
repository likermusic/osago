import type { IDriverWithKbm, PropositionCalculationsState } from 'entities/propositionCalculations';

export const getKbmLoadingStatus = (
  status: PropositionCalculationsState['propositionStatus'],
  drivers: IDriverWithKbm[],
  multiDriveKbm?: number,
) => {
  if (status !== 'error' && drivers.length > 0) return 'success';
  if (multiDriveKbm) return 'success';
  if ((status === 'loading' || status === 'initial') && drivers.length === 0) return 'loading';
  return 'error';
};
