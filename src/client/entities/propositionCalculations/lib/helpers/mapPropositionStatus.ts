import type { TCalculationStatus } from '../../types';

export const mapPropositionStatus = (
  propositionsLength: number,
  isOrder: boolean,
  isCompleted: boolean | undefined,
): TCalculationStatus => {
  if (!isCompleted) {
    return 'loading';
  }

  return propositionsLength > 0 || isOrder ? 'success' : 'empty';
};
