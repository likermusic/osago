import { useMemo } from 'react';

import { VEHICLE_TEXT_MAP_NOMINATIVE_CASE } from 'shared/config/vehicleTypeText';
import { capitalizeFirstLetter } from 'shared/lib/formatters';
import { useAppSelector } from 'shared/lib/redux';

import type { CarInfoCommonFields } from 'entities/carInfo';
import { selectCarParamsLabels, selectVehicleType } from 'entities/carInfo';

import { shouldUseMaskedCarInfoValue } from '../../model/CarInfo.selectors';

import { generateCommonHeaderParams } from './generateCommonHeaderParams';
import { generateExtendedHeaderParams } from './generateExtendedHeaderParams';

type THeaderParams = {
  title: string;
  icon: string;
  description: string;
};

export const useAccordionHeaderParams = (
  data: Nullable<CarInfoCommonFields>,
  isOpen: boolean,
  isExtendedData?: boolean,
) => {
  const carParamLabels = useAppSelector((state) => selectCarParamsLabels(state, data));
  const isVinMasked = useAppSelector(shouldUseMaskedCarInfoValue('carVinNumber', carParamLabels.vin));
  const isDocumentMasked = useAppSelector(shouldUseMaskedCarInfoValue('documentNumber', carParamLabels.documentNumber));

  const vehicleType = useAppSelector(selectVehicleType);

  const {
    title = capitalizeFirstLetter(VEHICLE_TEXT_MAP_NOMINATIVE_CASE[vehicleType]),
    icon,
    description = 'Проверьте данные',
  } = useMemo((): Partial<THeaderParams> => {
    if (!data || isOpen) {
      return {};
    }

    if (isExtendedData) {
      return generateExtendedHeaderParams(carParamLabels, isVinMasked, isDocumentMasked);
    }

    return generateCommonHeaderParams(carParamLabels, isVinMasked, isDocumentMasked, vehicleType);
  }, [carParamLabels, data, isDocumentMasked, isExtendedData, isOpen, isVinMasked, vehicleType]);

  return [title, icon, description] as const;
};
