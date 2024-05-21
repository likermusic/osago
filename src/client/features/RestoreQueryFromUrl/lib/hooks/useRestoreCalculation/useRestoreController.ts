import { useEffect } from 'react';

import { checkMemoryHasClientDataByNumber, RestorationFormEventMediator } from 'shared/lib';
import type { IRestorationData } from 'shared/lib';
import { useAppDispatch } from 'shared/lib/redux';

import { updateFormStoreThunkWithoutCar } from '../../utils/updateFormStoreWithoutCarThunk';

// Единая точка инициализации формы через события медиатора
export const useRestorationController = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const tryRestoreDataFromLocalStorage = async (data: IRestorationData) => {
      if (data.type === 'LOCAL_STORAGE') {
        const localStorageQuery = checkMemoryHasClientDataByNumber(data.payload.carNumber);

        if (localStorageQuery) {
          dispatch(updateFormStoreThunkWithoutCar(localStorageQuery));
        }
      }
    };

    const mediator = new RestorationFormEventMediator(tryRestoreDataFromLocalStorage);

    mediator.subscribeOnRestoration();
    return () => {
      mediator.unsubscribeOnRestoration();
    };
  }, [dispatch]);
};
