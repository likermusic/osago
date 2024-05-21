import BaseError from '@sravni/server-utils/lib/errors/BaseError';

import {
  isPromiseSettledFulfilled,
  mapPromiseSettledFulfilledValues,
} from '../../../../commonUtils/PromiseAllSettledHelpers';
import type { Auto } from '../../../../types/api/auto';
import { getBrandsRetriable } from '../getBrands/getBrands';
import { getCarEnginePowersRetriable } from '../getCarEnginePowers/getCarEnginePowers';
import { getCarModificationRetriable } from '../getCarModification/getCarModification';
import { getManufactureYearsRetriable } from '../getManufactureYears/getManufactureYears';
import { getModelsRetriable } from '../getModels/getModels';

export const getCarInfoDictionaries = async ({
  brandId,
  modelId,
  year,
  enginePower,
}: Partial<Auto.TAutoInfoDictionaryRequest>) => {
  const currentBrandId = brandId || '';
  const currentModelId = modelId || '';
  const currentYearId = year || 0;

  const data = await Promise.allSettled([
    getBrandsRetriable(),
    currentModelId && getManufactureYearsRetriable(currentModelId),
    currentBrandId && getModelsRetriable(currentBrandId),
    currentBrandId &&
      currentModelId &&
      currentYearId &&
      getCarEnginePowersRetriable(currentBrandId, currentModelId, currentYearId),
    currentBrandId &&
      currentModelId &&
      currentYearId &&
      enginePower &&
      getCarModificationRetriable(currentBrandId, currentModelId, currentYearId, enginePower),
  ] as const);

  const isMoreThenOnePromiseSuccess = data.some((field) => isPromiseSettledFulfilled<unknown>(field) && !!field.value);
  if (!isMoreThenOnePromiseSuccess) throw new BaseError(418, 'Не удалось восстановить справочники');

  const [brands, years, models, powers, modifications] = data.map((field) =>
    mapPromiseSettledFulfilledValues<unknown, []>(field, []),
  );

  return {
    brands,
    years: years || [],
    models: models || [],
    powers: powers || [],
    modifications: modifications || [],
  };
};
