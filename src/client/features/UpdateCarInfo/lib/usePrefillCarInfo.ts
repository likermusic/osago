import { useVehicleNumber } from '@sravni/cosago-react-library/lib/hooks';
import { vehicleNumberScheme } from '@sravni/cosago-react-library/lib/validationSchemes';
import { useBoolean } from '@sravni/react-utils';

import { RestorationFormEventMediator } from 'shared/lib';
import { writeClientNumbersToMemory } from 'shared/lib/localStorageMethods/writeClientNumbersToMemory';
import { useAppDispatch, useAppSelector } from 'shared/lib/redux';

import { selectVehicleType, tryLoadDataByCarNumberThunk } from 'entities/carInfo';
import type { CarInfoCommonFields } from 'entities/carInfo';

export const usePrefillCarInfo = (
  carNumberFieldName: string,
  onUpdateData: (data: CarInfoCommonFields) => void,
  shouldTryRestoreDataFromLocalStorage: boolean,
) => {
  const { currentNumber } = useVehicleNumber(carNumberFieldName);
  const isNumberValid = vehicleNumberScheme().isValidSync(currentNumber);
  const [isCarInfoLoading, setIsCarInfoLoading] = useBoolean();
  const dispatch = useAppDispatch();
  const vehicleType = useAppSelector(selectVehicleType);

  const prefillFieldsByCarNumber = async () => {
    if (!currentNumber || !isNumberValid) {
      return;
    }

    try {
      setIsCarInfoLoading.on();

      const mappedData = await dispatch(tryLoadDataByCarNumberThunk(currentNumber));
      if (mappedData) {
        onUpdateData(mappedData);
      }
    } catch (e) {}
    // если в локал сторадже есть инфа по авто восстанавливаем ее
    if (shouldTryRestoreDataFromLocalStorage) {
      // Отправляем запрос на добавление данных в форму из локального стора
      RestorationFormEventMediator.generateEvent({ type: 'LOCAL_STORAGE', payload: { carNumber: currentNumber } });
    }

    writeClientNumbersToMemory(currentNumber, vehicleType);

    setIsCarInfoLoading.off();
  };

  return {
    prefillFieldsByCarNumber,
    isCarInfoLoading,
  };
};
