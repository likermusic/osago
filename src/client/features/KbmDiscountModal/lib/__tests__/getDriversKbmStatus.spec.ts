import type { IKbmDiscountDriver } from '../../types';
import { IStatuses } from '../driversKbmStatuses';
import { getKbmStatusAndDrivers } from '../getKbmStatusAndDrivers';

const DEFAULT_KBM = 1.17;
const MIN_KBM = 0.46;
jest.mock('entities/KbmDiscount', () => ({ DEFAULT_KBM: 1.17, MIN_KBM: 0.46 }));

describe('WHEN getKbmStatusAndDrivers is called', () => {
  it(`AND one driver at least kbm is equal default kbm(${DEFAULT_KBM}), MUST return ThereAreDriversWithDefaultKbm and this driver`, () => {
    const drivers: IKbmDiscountDriver[] = [
      { kbm: DEFAULT_KBM, isInsurer: true, fullName: '', keyInDrivers: '', isSelected: false },
      { kbm: 2, isInsurer: false, fullName: '', keyInDrivers: '', isSelected: false },
    ];
    const expected = [IStatuses.ThereAreDriversWithDefaultKbm, [drivers[0]]];
    expect(getKbmStatusAndDrivers(drivers)).toStrictEqual(expected);
  });

  it(`AND one driver at least has kbm more than default(${DEFAULT_KBM}), MUST return ThereAreDriversWithAccidents and this driver`, () => {
    const drivers: IKbmDiscountDriver[] = [
      { kbm: 1.0, isInsurer: true, fullName: '', keyInDrivers: '', isSelected: false },
      { kbm: DEFAULT_KBM + 0.1, isInsurer: false, fullName: '', keyInDrivers: '', isSelected: false },
    ];
    const expected = [IStatuses.ThereAreDriversWithAccidents, [drivers[1]]];
    expect(getKbmStatusAndDrivers(drivers)).toStrictEqual(expected);
  });

  it('AND driver with max kbm in list is no insurer, MUST return ThereAreDriversWithMaxKbm and this driver', () => {
    const drivers: IKbmDiscountDriver[] = [
      { kbm: 1.0, isInsurer: false, fullName: '', keyInDrivers: '', isSelected: false },
      { kbm: 0.9, isInsurer: true, fullName: '', keyInDrivers: '', isSelected: false },
    ];
    const expected = [IStatuses.ThereAreDriversWithMaxKbm, [drivers[0]]];
    expect(getKbmStatusAndDrivers(drivers)).toStrictEqual(expected);
  });

  it('AND driver with max kbm in list is insurer, MUST return DefaultStatus and this driver', () => {
    const drivers: IKbmDiscountDriver[] = [
      { kbm: 1.0, isInsurer: true, fullName: '', keyInDrivers: '', isSelected: false },
      { kbm: 0.9, isInsurer: false, fullName: '', keyInDrivers: '', isSelected: false },
    ];
    const expected = [IStatuses.DefaultStatus, [drivers[0]]];
    expect(getKbmStatusAndDrivers(drivers)).toStrictEqual(expected);
  });

  it(`AND all drivers kbms are equal minimal kbm(${MIN_KBM}), MUST return TotalMinKbm and all drivers`, () => {
    const drivers: IKbmDiscountDriver[] = [
      { kbm: MIN_KBM, isInsurer: true, fullName: '', keyInDrivers: '', isSelected: false },
      { kbm: MIN_KBM, isInsurer: false, fullName: '', keyInDrivers: '', isSelected: false },
    ];
    const expected = [IStatuses.TotalMinKbm, drivers];
    expect(getKbmStatusAndDrivers(drivers)).toStrictEqual(expected);
  });

  it(`AND one driver kbm is equal minimal kbm(${MIN_KBM}), MUST return TotalMinKbm and this driver`, () => {
    const drivers: IKbmDiscountDriver[] = [
      { kbm: MIN_KBM, isInsurer: false, fullName: '', keyInDrivers: '', isSelected: false },
    ];
    const expected = [IStatuses.TotalMinKbm, drivers];
    expect(getKbmStatusAndDrivers(drivers)).toStrictEqual(expected);
  });

  it(`AND one driver not insurer and kbm is not equal minimal kbm(${MIN_KBM}), MUST return TheOnlyDriverLeftOrNoInsurer and this driver`, () => {
    const drivers: IKbmDiscountDriver[] = [
      { kbm: MIN_KBM + 1, isInsurer: false, fullName: '', keyInDrivers: '', isSelected: false },
    ];
    const expected = [IStatuses.TheOnlyDriverLeftOrNoInsurer, drivers];
    expect(getKbmStatusAndDrivers(drivers)).toStrictEqual(expected);
  });

  it(`AND one driver not insurer and kbm is equal default(${DEFAULT_KBM}), MUST return ThereAreDriversWithDefaultKbm and this driver`, () => {
    const drivers: IKbmDiscountDriver[] = [
      { kbm: DEFAULT_KBM, isInsurer: false, fullName: '', keyInDrivers: '', isSelected: false },
    ];
    const expected = [IStatuses.ThereAreDriversWithDefaultKbm, drivers];
    expect(getKbmStatusAndDrivers(drivers)).toStrictEqual(expected);
  });

  it(`AND one driver at least is insurer and drivers max kbm less than default(${DEFAULT_KBM}), MUST return DefaultStatus and insurer driver`, () => {
    const drivers: IKbmDiscountDriver[] = [
      { kbm: DEFAULT_KBM - 0.74, isInsurer: true, fullName: '', keyInDrivers: '', isSelected: false },
      { kbm: 0.1, isInsurer: false, fullName: '', keyInDrivers: '', isSelected: false },
    ];
    const expected = [IStatuses.DefaultStatus, [drivers[0]]];
    expect(getKbmStatusAndDrivers(drivers)).toStrictEqual(expected);
  });

  it(`AND max drivers kbm is default(${DEFAULT_KBM}) and one driver insurer, MUST return ThereAreDriversWithDefaultKbm and all drivers`, () => {
    const drivers: IKbmDiscountDriver[] = [
      { kbm: DEFAULT_KBM, isInsurer: true, fullName: '', keyInDrivers: '', isSelected: false },
      { kbm: DEFAULT_KBM, isInsurer: false, fullName: '', keyInDrivers: '', isSelected: false },
    ];
    const expected = [IStatuses.ThereAreDriversWithDefaultKbm, drivers];
    expect(getKbmStatusAndDrivers(drivers)).toStrictEqual(expected);
  });

  it(`AND max drivers kbm more than default(${DEFAULT_KBM}) and one driver insurer, MUST return DefaultStatus and all drivers`, () => {
    const drivers: IKbmDiscountDriver[] = [
      { kbm: DEFAULT_KBM + 1, isInsurer: true, fullName: '', keyInDrivers: '', isSelected: false },
      { kbm: DEFAULT_KBM + 1, isInsurer: false, fullName: '', keyInDrivers: '', isSelected: false },
    ];
    const expected = [IStatuses.DefaultStatus, [drivers[0]]];
    expect(getKbmStatusAndDrivers(drivers)).toStrictEqual(expected);
  });

  it(`AND all drivers is no insurers and kbms is default(${DEFAULT_KBM}), MUST return TheOnlyDriverLeftOrNoInsurer and all drivers`, () => {
    const drivers: IKbmDiscountDriver[] = [
      { kbm: DEFAULT_KBM, isInsurer: false, fullName: '', keyInDrivers: '', isSelected: false },
      { kbm: DEFAULT_KBM, isInsurer: false, fullName: '', keyInDrivers: '', isSelected: false },
    ];
    const expected = [IStatuses.ThereAreDriversWithDefaultKbm, drivers];
    expect(getKbmStatusAndDrivers(drivers)).toStrictEqual(expected);
  });

  it(`AND all drivers in no insurers and kbms is more then default(${DEFAULT_KBM}), MUST return TheOnlyDriverLeftOrNoInsurer and all drivers`, () => {
    const drivers: IKbmDiscountDriver[] = [
      { kbm: DEFAULT_KBM + 1, isInsurer: false, fullName: '', keyInDrivers: '', isSelected: false },
      { kbm: DEFAULT_KBM + 1, isInsurer: false, fullName: '', keyInDrivers: '', isSelected: false },
    ];
    const expected = [IStatuses.TheOnlyDriverLeftOrNoInsurer, drivers];
    expect(getKbmStatusAndDrivers(drivers)).toStrictEqual(expected);
  });
});
