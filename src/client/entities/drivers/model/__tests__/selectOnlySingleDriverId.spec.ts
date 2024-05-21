import { DRIVERS_DEFAULT_STATE } from '../../config';
import { selectOnlySingleDriverId } from '../drivers.selectors';

describe('WHEN "selectOnlySingleDriverId" is called', () => {
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

  it('AND there are no drivers in state, MUST return null', () => {
    expect(
      selectOnlySingleDriverId({
        drivers: { ...driversState, multipleFormsData: {} },
      }),
    ).toBeNull();
  });

  it('AND there is multi drive in state, MUST return null', () => {
    expect(
      selectOnlySingleDriverId({
        drivers: { ...driversState, isMultiDrive: true },
      }),
    ).toBeNull();
  });

  it('AND there are more then one driver in state, MUST return null', () => {
    expect(
      selectOnlySingleDriverId({
        drivers: driversState,
      }),
    ).toBeNull();
  });

  it('AND there is only one driver in state, MUST return driverId', () => {
    expect(
      selectOnlySingleDriverId({
        drivers: {
          ...driversState,
          multipleFormsData: {
            '1': driversState.multipleFormsData['1'],
          },
        },
      }),
    ).toEqual('1');
  });
});
