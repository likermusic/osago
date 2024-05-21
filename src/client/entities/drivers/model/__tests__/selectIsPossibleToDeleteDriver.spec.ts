import { DRIVERS_DEFAULT_STATE } from '../../config';
import { selectIsPossibleToDeleteDriver } from '../drivers.selectors';

describe('WHEN "selectIsPossibleToDeleteDriver" is called', () => {
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
  it('AND driver count is more than 1 AND first driver is fulfilled MUST return true', () => {
    expect(
      selectIsPossibleToDeleteDriver({
        drivers: driversState,
      }),
    ).toBeTruthy();
  });
  it('AND driver count is 1 MUST return false', () => {
    expect(
      selectIsPossibleToDeleteDriver({
        drivers: { ...driversState, multipleFormsData: { '1': driversState.multipleFormsData['1'] } },
      }),
    ).toBeFalsy();
  });
});
