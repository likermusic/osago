import { compose } from 'lodash/fp';

import { DEFAULT_KBM, MIN_KBM } from 'entities/KbmDiscount';

import type { IKbmDiscountDriver, TStatusesAndDrivers } from '../types';

import { IStatuses } from './driversKbmStatuses';
import { getMaxKbm } from './getMaxKbm';
import { getMinKbm } from './getMinKbm';

type TInnerResult = TStatusesAndDrivers | undefined;

const wrapper = (callback: (drivers: IKbmDiscountDriver[] | undefined) => TInnerResult) => (result: TInnerResult) =>
  result ?? callback(result);

const isLoadingStatus = (drivers: IKbmDiscountDriver[]) =>
  wrapper(() => {
    if (!drivers.length) {
      return [IStatuses.LoadingStatus, drivers];
    }
  });

const isDefaultKbm = (drivers: IKbmDiscountDriver[]) =>
  wrapper(() => {
    const defaultKbmDrivers = drivers.filter((driver) => driver.kbm === DEFAULT_KBM);
    if (defaultKbmDrivers.length > 0) {
      return [IStatuses.ThereAreDriversWithDefaultKbm, defaultKbmDrivers];
    }
  });

const isMoreThanDefaultKbm = (drivers: IKbmDiscountDriver[]) =>
  wrapper(() => {
    if (drivers.length > 1) {
      const driversWithoutInsurer = drivers.filter((driver) => !driver.isInsurer);
      if (getMaxKbm(drivers) !== getMinKbm(drivers)) {
        const driversWithoutInsurerWithMoreThanDefaultKbm = driversWithoutInsurer.filter(
          (driver) => driver.kbm > DEFAULT_KBM,
        );

        if (driversWithoutInsurerWithMoreThanDefaultKbm.length > 0) {
          return [IStatuses.ThereAreDriversWithAccidents, driversWithoutInsurerWithMoreThanDefaultKbm];
        }
      }
    }
  });

const isMaxKbm = (drivers: IKbmDiscountDriver[]) =>
  wrapper(() => {
    if (drivers.length > 1) {
      const driversWithoutInsurer = drivers.filter((driver) => !driver.isInsurer);
      const maxKbmValue = getMaxKbm(drivers);
      const minKbmValue = getMinKbm(drivers);
      if (maxKbmValue !== minKbmValue) {
        const driversWithoutInsurerWithMaxKbm = driversWithoutInsurer.filter((driver) => driver.kbm === maxKbmValue);
        if (driversWithoutInsurerWithMaxKbm.length > 0) {
          return [IStatuses.ThereAreDriversWithMaxKbm, driversWithoutInsurerWithMaxKbm];
        }
      }
    }
  });

const allHasMinKbm = (drivers: IKbmDiscountDriver[]) =>
  wrapper(() => {
    const isAllDriversWithMinKbm = drivers.every((driver) => driver.kbm === MIN_KBM);
    if (isAllDriversWithMinKbm) {
      return [IStatuses.TotalMinKbm, drivers];
    }
  });

const isTheOnlyDriverLeftOrNoInsurer = (drivers: IKbmDiscountDriver[]) =>
  wrapper(() => {
    const isThereIsInsurer = drivers.some((driver) => driver.isInsurer);
    if (drivers.length === 1 || !isThereIsInsurer) {
      return [IStatuses.TheOnlyDriverLeftOrNoInsurer, drivers];
    }
  });

const defaultCase =
  (drivers: IKbmDiscountDriver[]) =>
  (result: TInnerResult): TStatusesAndDrivers =>
    result ?? [IStatuses.DefaultStatus, drivers.filter((driver) => driver.isInsurer)];

export const getKbmStatusAndDrivers = (drivers: IKbmDiscountDriver[]): TStatusesAndDrivers =>
  compose(
    defaultCase(drivers),
    isTheOnlyDriverLeftOrNoInsurer(drivers),
    allHasMinKbm(drivers),
    isMaxKbm(drivers),
    isMoreThanDefaultKbm(drivers),
    isDefaultKbm(drivers),
    isLoadingStatus(drivers),
  )(undefined);
