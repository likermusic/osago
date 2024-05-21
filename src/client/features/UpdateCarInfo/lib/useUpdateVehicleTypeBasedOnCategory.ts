import { useFormContext } from '@sravni/cosago-react-library/lib/hooks';
import { carNumberScheme, motorcycleNumberScheme } from '@sravni/cosago-react-library/lib/validationSchemes';
import { useEffect } from 'react';

import { useAppDispatch } from 'shared/lib/redux';

import type { CarInfoCommonFields } from 'entities/carInfo';
import { setCarInfoVehicleType } from 'entities/carInfo';

// TODO: во вторую добавить тест https://sravni-corp.atlassian.net/browse/OS-10278
export const useUpdateVehicleTypeBasedOnCategory = () => {
  const dispatch = useAppDispatch();
  const { watch, getValues, setValue } = useFormContext<CarInfoCommonFields>();
  const category = watch('category');

  useEffect(() => {
    if (!category?.value) return;

    const carNumber = getValues('carNumber');

    if (category?.value === 'A') {
      dispatch(setCarInfoVehicleType('motorcycle'));

      const isCarNumberValidSync = motorcycleNumberScheme().isValidSync(carNumber);
      if (!isCarNumberValidSync) setValue('carNumber', '');
    } else {
      dispatch(setCarInfoVehicleType('car'));

      const isCarNumberValidSync = carNumberScheme().isValidSync(carNumber);
      if (!isCarNumberValidSync) setValue('carNumber', '');
    }
  }, [category, dispatch, getValues, setValue]);
};
