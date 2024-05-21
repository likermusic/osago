import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { ICustomSelectOption } from '@sravni/cosago-react-library/lib/types';

import { mapDictionary } from '../lib/mapDictionary';
import type {
  CarInfoCommonFields,
  CarInfoEntityReducer,
  CarInfoIncomingDictionaries,
  TObjectStore,
  TBrandData,
} from '../types';

import { queries } from './carInfo.query';
import { FormFieldsValidationSchemaCarInfo } from './carInfo.validationSchema';

// Выбираемые значения должны быть null, чтобы при стирании они менялись на undefined и становились dirty
const initialState: CarInfoEntityReducer = {
  data: null,
  defaults: {
    bodyNumber: '',
    carBrand: null,
    carManufactureYear: null,
    carModel: null,
    carNumber: '',
    carVinNumber: '',
    chassisNumber: '',
    documentIssueDate: '',
    documentNumber: '',
    documentType: undefined,
    enginePower: null,
    carModification: undefined,
    identifyType: '',
  },
  dictionaries: {
    brands: [],
    models: {},
    years: {},
    powers: {},
    modification: {},
  },
  lastPrefilledValues: null,
  isFullFilled: false,
  isActive: true,
  isCarInfoLoaded: undefined,
  shouldShowCarNumber: false,
  vehicleType: 'car',
};

export const carInfoSlice = createSlice({
  name: 'carInfo',
  initialState,
  reducers: {
    setShoudShowCarNumberField: (state, { payload }: PayloadAction<boolean>) => {
      state.shouldShowCarNumber = payload;
    },
    setCarInfo: (state, { payload }: PayloadAction<{ data: CarInfoCommonFields; isFullFilled?: boolean }>) => {
      state.data = payload.data;
      state.shouldShowCarNumber = !!payload.data.carNumber;
      state.isFullFilled =
        payload.isFullFilled !== undefined
          ? payload.isFullFilled
          : FormFieldsValidationSchemaCarInfo().isValidSync(payload.data);
    },
    setCarInfoDefault: (state, { payload }: PayloadAction<Partial<CarInfoCommonFields>>) => {
      state.defaults = {
        ...initialState.defaults,
        ...payload,
      };
      state.isFullFilled = false;
    },
    setCarInfoVehicleType: (state, { payload }: PayloadAction<CarInfoEntityReducer['vehicleType']>) => {
      state.vehicleType = payload;
    },
    resetCarInfo: (state) => {
      state.data = initialState.data;
      state.defaults = initialState.defaults;
      state.isFullFilled = false;
    },
    setCarInfoDictionaries: (state, { payload }: PayloadAction<Partial<CarInfoIncomingDictionaries>>) => {
      const { brands, models, powers, years, modification } = mapDictionary(payload);

      return {
        ...state,
        dictionaries: {
          brands: brands?.length ? brands : state.dictionaries.brands,
          models: {
            ...state.dictionaries.models,
            ...models,
          },
          modification: {
            ...state.dictionaries.modification,
            ...modification,
          },
          powers: {
            ...state.dictionaries.powers,
            ...powers,
          },
          years: {
            ...state.dictionaries.years,
            ...years,
          },
        },
      };
    },
    setCarInfoLoaded: (state, { payload }: PayloadAction<boolean>) => {
      state.isCarInfoLoaded = payload;
    },
    setCarInfoPrefilled: (state, { payload }: PayloadAction<CarInfoEntityReducer['lastPrefilledValues']>) => {
      state.lastPrefilledValues = payload;
    },
    resetCarInfoPrefilled: (
      state,
      { payload }: PayloadAction<Partial<CarInfoEntityReducer['lastPrefilledValues']>>,
    ) => {
      state.lastPrefilledValues = {
        ...payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      queries.endpoints.getEnginePowers.matchFulfilled,
      (state, { payload }: PayloadAction<TObjectStore>) => ({
        ...state,
        dictionaries: {
          ...state.dictionaries,
          powers: {
            ...state.dictionaries.powers,
            ...payload,
          },
        },
      }),
    );

    builder.addMatcher(
      queries.endpoints.getBrands.matchFulfilled,
      (state, { payload }: PayloadAction<Array<ICustomSelectOption<TBrandData>>>) => ({
        ...state,
        dictionaries: {
          ...state.dictionaries,
          brands: payload || state.dictionaries.brands,
        },
      }),
    );

    builder.addMatcher(
      queries.endpoints.getModels.matchFulfilled,
      (state, { payload }: PayloadAction<TObjectStore>) => ({
        ...state,
        dictionaries: {
          ...state.dictionaries,
          models: {
            ...state.dictionaries.models,
            ...payload,
          },
        },
      }),
    );

    builder.addMatcher(
      queries.endpoints.getManufactureYears.matchFulfilled,
      (state, { payload }: PayloadAction<TObjectStore>) => ({
        ...state,
        dictionaries: {
          ...state.dictionaries,
          years: {
            ...state.dictionaries.years,
            ...payload,
          },
        },
      }),
    );

    builder.addMatcher(
      queries.endpoints.getModification.matchFulfilled,
      (state, { payload }: PayloadAction<TObjectStore>) => ({
        ...state,
        dictionaries: {
          ...state.dictionaries,
          modification: {
            ...state.dictionaries.modification,
            ...payload,
          },
        },
      }),
    );
  },
});

export const {
  setShoudShowCarNumberField,
  setCarInfo,
  setCarInfoVehicleType,
  setCarInfoDefault,
  resetCarInfo,
  resetCarInfoPrefilled,
  setCarInfoDictionaries,
  setCarInfoLoaded,
  setCarInfoPrefilled,
} = carInfoSlice.actions;
