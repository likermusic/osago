import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

import { DRIVERS_DEFAULT_STATE } from '../config';
import { generateEmptyDriver } from '../lib/generateEmptyDriver';
import type { DriversCommonFields, DriversEntityReducer } from '../types';

const initialState: DriversEntityReducer = {
  data: null,
  defaults: {
    ...DRIVERS_DEFAULT_STATE,
  },
  multipleFormsData: generateEmptyDriver(),
  isFullFilled: false,
  isActive: true,
  isMultiDrive: false,
};

export const driversSlice = createSlice({
  name: 'drivers',
  initialState,
  reducers: {
    resetDrivers: () => initialState,
    setDrivers: (
      state,
      {
        payload,
      }: PayloadAction<{
        drivers: Form.Multi<DriversCommonFields>['multipleFormsData'];
        isMultiDrive: boolean;
      }>,
    ) => {
      state.multipleFormsData = {
        ...payload.drivers,
      };
      state.isMultiDrive = payload.isMultiDrive;
      state.isFilledByEsiaStatus = false;
    },
    setMultiDrive: (state, { payload }: PayloadAction<boolean>) => {
      state.isMultiDrive = payload;
    },
    updateDriver: (
      state,
      {
        payload,
      }: PayloadAction<{
        driverId: Nullable<string>;
        data: DriversCommonFields;
        isMultiDrive: boolean;
        isFilledByEsiaStatus?: boolean;
      }>,
    ) => {
      state.isFilledByEsiaStatus = payload.isFilledByEsiaStatus;
      state.isMultiDrive = payload.isMultiDrive;
      if (payload.driverId) {
        state.multipleFormsData[payload.driverId] = {
          data: payload.data,
          isFullFilled: true,
        };
      } else {
        state.multipleFormsData[nanoid()] = {
          data: payload.data,
          isFullFilled: true,
        };
      }
    },
    updateDriverKbm: (
      state,
      {
        payload,
      }: PayloadAction<{
        driverId: string;
        kbm: DriversCommonFields['kbm'];
      }>,
    ) => {
      if (payload?.driverId && state.multipleFormsData[payload.driverId]) {
        state.multipleFormsData[payload.driverId] = {
          ...state.multipleFormsData[payload.driverId],
          data: {
            ...(state.multipleFormsData[payload.driverId].data as DriversCommonFields),
            kbm: payload.kbm,
          },
        };
      }
    },
    updateDriverByEsia: (state, { payload }: PayloadAction<DriversCommonFields>) => {
      const firstDriverId = state.multipleFormsData ? Object.keys(state.multipleFormsData)[0] : nanoid();
      /**
       *  тут сделал отдельный вход данных для есиа чтобы не вытаскивать водителя на уровне клиента
       * */
      state.multipleFormsData[firstDriverId] = {
        data: payload,
        isFullFilled: false,
      };
      state.isFilledByEsiaStatus = true;
    },
    setDriversDefault: (state, { payload }: PayloadAction<DriversCommonFields>) => {
      state.defaults = payload;
      state.isFullFilled = false;
    },
    clearDriverEsiaFlag: (state) => {
      state.isFilledByEsiaStatus = initialState.isFilledByEsiaStatus;
    },
    removeDriver: (state, { payload }: PayloadAction<{ driverId: string }>) => {
      const driversList = Object.keys(state.multipleFormsData);

      if (driversList.length > 1) {
        delete state.multipleFormsData[payload.driverId];
      }
    },
    addDriver: (state) => {
      state.multipleFormsData = {
        ...state.multipleFormsData,
        ...generateEmptyDriver(),
      };
    },
  },
});

export const {
  clearDriverEsiaFlag,
  updateDriverByEsia,
  resetDrivers,
  setDrivers,
  setMultiDrive,
  updateDriver,
  setDriversDefault,
  removeDriver,
  addDriver,
  updateDriverKbm,
} = driversSlice.actions;
