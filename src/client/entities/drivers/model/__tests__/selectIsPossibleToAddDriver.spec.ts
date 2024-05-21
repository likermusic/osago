import { DRIVERS_DEFAULT_STATE } from '../../config';
import { selectIsPossibleToAddDriver } from '../drivers.selectors';

describe('WHEN "selectIsPossibleToAddDriver" is called', () => {
  const driversState = {
    data: null,
    defaults: DRIVERS_DEFAULT_STATE,
    isMultiDrive: false,
    isActive: false,
    isFullFilled: true,
    multipleFormsData: {
      '1': {
        isActive: false,
        isFullFilled: true,
        data: DRIVERS_DEFAULT_STATE,
      },
      '2': {
        isActive: false,
        isFullFilled: true,
        data: DRIVERS_DEFAULT_STATE,
      },
      '3': {
        isActive: false,
        isFullFilled: true,
        data: DRIVERS_DEFAULT_STATE,
      },
      '4': {
        isActive: false,
        isFullFilled: true,
        data: DRIVERS_DEFAULT_STATE,
      },
    },
  };
  it('AND driver count is max MUST return false', () => {
    expect(
      selectIsPossibleToAddDriver('5')({
        drivers: {
          ...driversState,
          multipleFormsData: { ...driversState.multipleFormsData, '5': driversState.multipleFormsData['1'] },
        },
      }),
    ).toBeFalsy();
  });
  it('AND driver index is not last MUST return false', () => {
    expect(selectIsPossibleToAddDriver('3')({ drivers: driversState })).toBeFalsy();
  });
  it('AND driver index is not in drivers MUST return false', () => {
    expect(selectIsPossibleToAddDriver('34')({ drivers: driversState })).toBeFalsy();
  });
  it('AND driver index is last MUST return true', () => {
    expect(selectIsPossibleToAddDriver('4')({ drivers: driversState })).toBeTruthy();
  });
});
