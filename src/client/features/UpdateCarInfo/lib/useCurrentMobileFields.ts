import { Documents } from '@sravni/cosago-react-library/lib/constants';
import { useFormContext } from '@sravni/cosago-react-library/lib/hooks';
import { useMemo } from 'react';

import { useAppSelector } from 'shared/lib/redux';

import type { CarInfoCommonFields } from 'entities/carInfo';
import { selectVehicleType } from 'entities/carInfo';

import { FormFieldsMobileSequence } from '../ui/CarInfo.config';

import { useCategoryType } from './useCategoryType';
import { useIsCarModificationsAvailable } from './useIsCarModificationsAvailable';

const FIELDS_TO_REMOVE_RECORD: Record<CarInfoCommonFields['identifyType'], Array<keyof CarInfoCommonFields>> = {
  '': [],
  [Documents.CarIdentifyType.VIN]: ['bodyNumber', 'chassisNumber'],
  [Documents.CarIdentifyType.BodyNumber]: ['carVinNumber', 'chassisNumber'],
  [Documents.CarIdentifyType.ChassisNumber]: ['carVinNumber', 'bodyNumber'],
};

export const useCurrentMobileFields = () => {
  const isCarModificationAvailable = useIsCarModificationsAvailable();
  const { watch } = useFormContext<CarInfoCommonFields>();
  const identifyType = watch('identifyType');
  const categoryType = useCategoryType();

  const vehicleType = useAppSelector(selectVehicleType);

  return useMemo(
    () =>
      FormFieldsMobileSequence(vehicleType).filter((field) => {
        if (FIELDS_TO_REMOVE_RECORD[identifyType]?.includes(field.fieldName)) return false;
        if (field.fieldName === 'category' && categoryType !== 'field') return false;
        if (field.fieldName === 'carModification' && !isCarModificationAvailable) return false;

        return true;
      }),
    [categoryType, identifyType, vehicleType, isCarModificationAvailable],
  );
};
