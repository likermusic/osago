import type { IDriverWithKbm, PropositionCalculationsState } from 'entities/propositionCalculations';

import { getKbmLoadingStatus } from '../getKbmLoadingStatus';

const MOCK_DRIVERS = [
  {
    kbm: 0,
    fullName: '',
  },
];

describe('WHEN "getKbmLoadingStatus" is called', () => {
  it.each([
    ['loading', MOCK_DRIVERS, 0, 'success'],
    ['loading', [], 0, 'loading'],
    ['success', MOCK_DRIVERS, 0, 'success'],
    ['success', [], 0, 'error'],
    ['error', MOCK_DRIVERS, 0, 'error'],
    ['error', [], 0, 'error'],
    ['initial', MOCK_DRIVERS, 0, 'success'],
    ['initial', [], 0, 'loading'],
    ['empty', MOCK_DRIVERS, 0, 'success'],
    ['empty', [], 0, 'error'],
    ['empty', [], 1.17, 'success'],
  ] as Array<[PropositionCalculationsState['propositionStatus'], IDriverWithKbm[], number, 'loading' | 'success' | 'error']>)(
    'AND proposition calculation status is equal %p, AND drivers %p , AND multiDrive kmb is %p, MUST return %p',
    (
      status: PropositionCalculationsState['propositionStatus'],
      drivers: IDriverWithKbm[],
      multidriveKbm,
      result: 'loading' | 'success' | 'error',
    ) => {
      expect(getKbmLoadingStatus(status, drivers, multidriveKbm)).toEqual(result);
    },
  );
});
