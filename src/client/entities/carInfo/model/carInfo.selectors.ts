import { removeSpaces } from '@sravni/cosago-react-library/lib/utils';

import type { TVehicleCategories } from 'commonTypes/categories';

import type { SliceStateFromReducer } from 'shared/types';

import type { CarInfoCommonFields } from '../types';

import type { carInfoSlice } from './carInfo.slice';

export type TCarInfoState = SliceStateFromReducer<typeof carInfoSlice>;

export const selectCarInfo = (state: TCarInfoState) => state.carInfo;
export const selectIsMaskedCarInfoValue =
  (
    fieldName: keyof Pick<CarInfoCommonFields, 'carVinNumber' | 'documentNumber' | 'bodyNumber' | 'chassisNumber'>,
    value: string,
  ) =>
  (state: TCarInfoState) => {
    if (!value) {
      return false;
    }

    const prefilledValue = state.carInfo.lastPrefilledValues?.[fieldName] ?? '';

    return !!prefilledValue && prefilledValue.startsWith(removeSpaces(value).substring(0, 3));
  };

export const selectCarInfoData = (state: TCarInfoState) => {
  if (!state.carInfo.data) {
    return state.carInfo.defaults;
  }

  return state.carInfo.data;
};
export const selectVehicleType = (state: TCarInfoState) => state.carInfo.vehicleType;
export const selectVehicleCategory = (state: TCarInfoState) =>
  // as потому что нет возможности точно типизировать поле
  state.carInfo?.data?.category?.value as TVehicleCategories | undefined;

export const selectCarInfoDictionaries = (state: TCarInfoState) => state.carInfo.dictionaries;
export const selectCurrentCarNumber = (state: TCarInfoState) => state.carInfo.data?.carNumber || '';
export const selectShouldShowCarInfoCarNumberField = (state: TCarInfoState) => state.carInfo.shouldShowCarNumber;

export const selectIsCarInfoLoaded = (state: TCarInfoState) => state.carInfo.isCarInfoLoaded;
export const selectLastPrefilledValues = (state: TCarInfoState) => state.carInfo.lastPrefilledValues;
