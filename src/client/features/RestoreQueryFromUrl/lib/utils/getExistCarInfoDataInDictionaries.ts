import type { Auto } from 'commonTypes/api/auto';
import type { Query } from 'commonTypes/api/query';

import { mapCalculationQueryToFormCarInfo } from './mapCalculationQueryToFormData';

export const getExistCarInfoDataInDictionaries = (
  calculationQuery: Query.TRestoreCalculationQueryResponse,
  dictionaries: Nullable<Auto.TCalculationQueryDictionary>,
) => {
  const carInfo = mapCalculationQueryToFormCarInfo(calculationQuery);

  const {
    brandId: brandIdFromQuery,
    enginePower: enginePowerFromQuery,
    modification: modificationFromQuery,
    modelId: modelIdFromQuery,
    year: yearFromQuery,
  } = calculationQuery || {};

  const { brands, models, years, powers, modifications } = dictionaries || {};

  const isBrandExist = brands?.some((brand) => brand.id === brandIdFromQuery);
  const modelInQuery = models?.find((model) => model.id === modelIdFromQuery);
  const isYearExist = !!yearFromQuery && years?.includes(yearFromQuery);
  const isPowerExist = !!enginePowerFromQuery && powers?.includes(enginePowerFromQuery);
  const isModificationExist = modifications?.some((modification) => modification.name === modificationFromQuery);

  const brandId = isBrandExist ? brandIdFromQuery : null;
  const modelId = modelInQuery ? modelIdFromQuery : null;
  const year = isYearExist ? yearFromQuery : null;
  const enginePower = isPowerExist ? enginePowerFromQuery : null;
  const modification = isModificationExist ? modificationFromQuery : null;

  return {
    carInfo: {
      ...carInfo,
      carBrand: brandId ? { value: brandId } : null,
      carModification: modification ? { value: modification } : undefined,
      enginePower: enginePower ? { value: enginePower } : null,
      carModel: modelId ? { value: modelId, categories: modelInQuery?.categories ?? [] } : null,
      carManufactureYear: year ? { value: year } : null,
    },
    brandId,
    modelId,
    year,
    enginePower,
  };
};
