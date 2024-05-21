import { useFormContext } from '@sravni/cosago-react-library/lib/hooks';
import { useEffect } from 'react';

import type { CarInfoCommonFields } from 'entities/carInfo';

import { useIsCarModificationsAvailable } from './useIsCarModificationsAvailable';

export const useUpdateModificationsValue = () => {
  const isModificationsAvailable = useIsCarModificationsAvailable();
  const { watch, resetField } = useFormContext<CarInfoCommonFields>();
  const modification = watch('carModification');

  // Выставляем значение на { value: '' }, если modification null или undefined, чтобы использовать это в валидаторе
  useEffect(() => {
    if (isModificationsAvailable && !modification) {
      resetField('carModification', { keepDirty: true, defaultValue: { value: '' } });
    }
  }, [isModificationsAvailable, modification, resetField]);
};
