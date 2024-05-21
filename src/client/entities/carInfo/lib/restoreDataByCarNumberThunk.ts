import { vehicleNumberScheme } from '@sravni/cosago-react-library/lib/validationSchemes';

import { getCarInfo } from 'shared/api/auto';

import type { CarInfoCommonFields } from 'entities/carInfo';

import { selectLastPrefilledValues } from '../model/carInfo.selectors';
import {
  setCarInfoDefault,
  setCarInfoDictionaries,
  setCarInfoLoaded,
  setCarInfoPrefilled,
  setShoudShowCarNumberField,
} from '../model/carInfo.slice';

import { mapCarInfo } from './mapAutoInfo';

export const tryLoadDataByCarNumberThunk =
  (autoNumber: string): ThunkResult<Promise<Nullable<CarInfoCommonFields>>> =>
  async (dispatch) => {
    let carInfo: Nullable<CarInfoCommonFields> = null;

    try {
      const data = await getCarInfo(autoNumber);
      dispatch(setCarInfoLoaded(false));
      if (data) {
        carInfo = { ...mapCarInfo(data), carNumber: autoNumber } as CarInfoCommonFields;
        dispatch(setCarInfoDictionaries(data));
        // Сохраняем последний запрос номера, чтобы выводить звездочки в полях. Временное решение, пока не перешли на бфф
        dispatch(setCarInfoPrefilled(carInfo));
        dispatch(setCarInfoLoaded(!!carInfo.carBrand?.value));
      }
    } catch (e) {
      return null;
    }

    // создаем указатель на новый объект, чтобы не получить защищенный от записи объект через указатель
    return carInfo ? { ...carInfo } : null;
  };

export const restoreDataByCarNumberThunk =
  (autoNumber?: string): ThunkResult<void> =>
  async (dispatch, getState) => {
    if (autoNumber && vehicleNumberScheme().isValidSync(autoNumber)) {
      dispatch(setShoudShowCarNumberField(true));

      let carInfo = selectLastPrefilledValues(getState());
      if (carInfo?.carNumber !== autoNumber) {
        carInfo = await dispatch(tryLoadDataByCarNumberThunk(autoNumber));
      }

      if (carInfo) {
        dispatch(setCarInfoDefault(carInfo));
      } else {
        dispatch(setCarInfoDefault({ carNumber: autoNumber }));
      }
    }
  };
