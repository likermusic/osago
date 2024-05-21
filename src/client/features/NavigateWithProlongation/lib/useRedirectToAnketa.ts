import { useCallback } from 'react';

import { CustomRouter } from 'shared/config/router';
import { useAppDispatch } from 'shared/lib/redux';

import type { CarNumberLandingFormFields } from 'entities/carInfo';
import { setCarInfoVehicleType, setShoudShowCarNumberField } from 'entities/carInfo';

import { resetAnketaDataThunk } from './resetAnketaData';

export const useRedirectToAnketa = () => {
  const dispatch = useAppDispatch();

  return useCallback(
    (formData: CarNumberLandingFormFields | null) => {
      dispatch(resetAnketaDataThunk());

      const { carNumber, vehicleType } = formData || {};

      if (!carNumber) dispatch(setShoudShowCarNumberField(false));
      if (vehicleType) dispatch(setCarInfoVehicleType(vehicleType));
      CustomRouter.push('anketa', { query: carNumber ? { autoNumber: carNumber } : undefined });
    },
    [dispatch],
  );
};
