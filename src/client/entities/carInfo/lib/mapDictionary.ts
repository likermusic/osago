import type { CarInfoIncomingDictionaries } from '../types';

import { mapBrands } from './mapBrands';
import { mapCarPropertyToSelectOption } from './mapCarPropertyToSelectOption';
import { mapManufactureYears } from './mapManufactureYears';
import { mapModifications } from './mapModifications';
import { mapPowers } from './mapPowers';

export const mapDictionary = (payload: Partial<CarInfoIncomingDictionaries>) => {
  const { brand, brands, model, models, modifications, power, powers, year, years } = payload ?? {};
  const brandId = brand?.id ?? undefined;
  const modelId = model?.id ?? undefined;
  const currentYear = year ?? undefined;
  const currentPower = power ?? undefined;

  return {
    models: mapCarPropertyToSelectOption({ brandId }, models),
    years: mapManufactureYears({ modelId }, years),
    powers: mapPowers({ brandId, modelId, year: currentYear }, powers),
    brands: mapBrands(brands),
    modification: mapModifications({ brandId, modelId, year: currentYear, power: currentPower }, modifications),
  };
};
