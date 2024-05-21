import { useFormContext } from '@sravni/cosago-react-library/lib/hooks';
import { useMemo } from 'react';

import { useAppSelector } from 'shared/lib/redux';

import {
  selectCarInfoDictionaries,
  type CarInfoCommonFields,
  getPowerOptionsKey,
  getModificationOptionsKey,
} from 'entities/carInfo';

export const useOptions = () => {
  const dictionaries = useAppSelector(selectCarInfoDictionaries);
  const { watch } = useFormContext<CarInfoCommonFields>();
  const brandId = watch('carBrand.value');
  const modelId = watch('carModel.value');
  const modelCategories = watch('carModel.categories');
  const year = watch('carManufactureYear.value');
  const power = watch('enginePower.value');

  return useMemo(
    () => ({
      brands: dictionaries.brands,
      models: dictionaries.models[brandId] ?? [],
      years: dictionaries.years[modelId] ?? [],
      powers: dictionaries.powers[getPowerOptionsKey({ brandId, modelId, year })] ?? [],
      modifications: dictionaries.modification[getModificationOptionsKey({ brandId, modelId, year, power })] ?? [],
      categories: modelCategories?.map((value) => ({ value, label: value })) ?? [],
    }),
    [
      brandId,
      dictionaries.brands,
      dictionaries.models,
      dictionaries.modification,
      dictionaries.powers,
      dictionaries.years,
      modelCategories,
      modelId,
      power,
      year,
    ],
  );
};
