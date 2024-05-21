import { DRIVERS_DEFAULT_STATE } from '../../config';
import { selectDriverIndex } from '../drivers.selectors';

describe('WHEN "selectDriverIndex" is called', () => {
  const driversState = {
    data: null,
    defaults: DRIVERS_DEFAULT_STATE,
    isMultiDrive: false,
    isActive: false,
    isFullFilled: true,
    multipleFormsData: {
      1: {
        isActive: false,
        isFullFilled: true,
        data: DRIVERS_DEFAULT_STATE,
      },
      2: {
        isActive: false,
        isFullFilled: true,
        data: DRIVERS_DEFAULT_STATE,
      },
    },
  };

  it('MUST return index of driver', () => {
    expect(selectDriverIndex('2')({ drivers: driversState })).toEqual(1);
  });
});
