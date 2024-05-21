import { isDefined } from '@sravni/react-utils';
import { createSelector } from 'reselect';

import type { SliceStateFromReducer } from 'shared/types';

import { MAX_DRIVERS_COUNT } from '../config';
import type { DriversCommonFields } from '../types';

import type { driversSlice } from './drivers.slice';

type TDriversState = SliceStateFromReducer<typeof driversSlice>;

export const selectMultiDrive = (state: TDriversState) => state.drivers.isMultiDrive;
export const selectDrivers = (state: TDriversState) => state.drivers;
export const selectIsDriverFilledByEsia = (state: TDriversState) => state.drivers.isFilledByEsiaStatus;

export const selectAllDrivers = (state: TDriversState) => state.drivers.multipleFormsData;

export const selectOnlySingleDriverId = (state: TDriversState) => {
  if (state.drivers.isMultiDrive) {
    return null;
  }

  const driversIds = Object.keys(state.drivers.multipleFormsData || []);

  // Отдаем ид только если водитель один.
  return driversIds.length === 1 ? driversIds[0] : null;
};

export const selectFirstDriverId = (state: TDriversState) => {
  const driversIds = Object.keys(state.drivers.multipleFormsData || []);

  return driversIds?.[0];
};
export const selectDriversNames = createSelector(selectDrivers, (drivers) => {
  if (!drivers.multipleFormsData) {
    return [];
  }

  return Object.values(drivers.multipleFormsData)
    .map(({ data }) => data?.fullName?.label)
    .filter(isDefined);
});

export const selectDriverData =
  (driverId: Nullable<string>) =>
  (state: TDriversState): DriversCommonFields => {
    if (!driverId) {
      return state.drivers.defaults;
    }

    return state.drivers.multipleFormsData[driverId]?.data ?? state.drivers.defaults;
  };

export const selectDriverIndex = (multipartFormId: Nullable<string> | undefined) => (state: TDriversState) => {
  const driversSet = selectAllDrivers(state);
  const driversSetKeys = Object.keys(driversSet);
  return driversSetKeys.findIndex((key) => key === multipartFormId);
};

const selectIsMaxDriverQuantity = (state: TDriversState) => {
  const driversSet = selectAllDrivers(state);
  const driversSetKeys = Object.keys(driversSet);
  return driversSetKeys.length === MAX_DRIVERS_COUNT;
};

const selectLastDriverKey = (state: TDriversState) => {
  const driversSet = selectAllDrivers(state);
  return Object.keys(driversSet).pop();
};

export const selectIsPossibleToAddDriver =
  (multipartFormId: Nullable<string> | undefined) => (state: TDriversState) => {
    const isMaxDriverQuantity = selectIsMaxDriverQuantity(state);

    if (isMaxDriverQuantity) {
      return false;
    }

    const lastDriverKey = selectLastDriverKey(state);
    return multipartFormId === lastDriverKey;
  };

export const selectFirstDriver = (state: TDriversState) => {
  const drivers = selectAllDrivers(state);
  const driversSetKeys = Object.keys(drivers);
  return drivers[driversSetKeys[0]];
};

export const selectDriversCount = (state: TDriversState) => {
  const drivers = selectAllDrivers(state);
  return Object.keys(drivers).length;
};

export const selectIsPossibleToDeleteDriver = (state: TDriversState) => {
  const driverCount = selectDriversCount(state);
  const firstDriver = selectFirstDriver(state);
  return driverCount > 1 && firstDriver.isFullFilled;
};
