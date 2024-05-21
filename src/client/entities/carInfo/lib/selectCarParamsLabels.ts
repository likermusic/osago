import { CarDocumentsDictionary } from '@sravni/cosago-react-library/lib/dictionaries';
import { beautifyCarNumber, formatDocumentNumber } from '@sravni/cosago-react-library/lib/utils';
import { createSelector } from 'reselect';

import { removeUnderscores } from 'shared/lib/formatters';
import { getCarBrandLogo } from 'shared/lib/getCarBrandLogo';

import type { TCarInfoState } from '../model/carInfo.selectors';
import { selectCarInfoDictionaries } from '../model/carInfo.selectors';
import type { CarInfoCommonFields } from '../types';

import { formatKey, getPowerOptionsKey } from './propertyKey';

export const selectCarParamsLabels = createSelector(
  [selectCarInfoDictionaries, (_state: TCarInfoState, data: Nullable<CarInfoCommonFields>) => data],
  (dictionaries, data) => {
    const { models, brands, years, powers } = dictionaries;
    const {
      carModel,
      carNumber,
      carBrand,
      carManufactureYear,
      enginePower,
      documentNumber,
      documentType,
      documentIssueDate,
      carVinNumber,
    } = data || {};

    const currentBrand = brands?.find(({ value }) => value === carBrand?.value);
    const modelKey = formatKey({ brandId: currentBrand?.value });
    const yearsKey = formatKey({ modelId: carModel?.value });
    const powersKey = getPowerOptionsKey({
      brandId: currentBrand?.value ?? '',
      modelId: carModel?.value ?? '',
      year: carManufactureYear?.value ?? '',
    });

    const currentModel = modelKey ? models[modelKey]?.find(({ value }) => value === carModel?.value) : undefined;
    const currentYear = yearsKey
      ? years[yearsKey]?.find(({ value }) => value === carManufactureYear?.value)
      : undefined;
    const currentPower = powersKey ? powers[powersKey]?.find(({ value }) => value === enginePower?.value) : undefined;

    return {
      logo: currentBrand?.data?.alias ? getCarBrandLogo(currentBrand.data.alias) : undefined,
      brand: currentBrand?.label,
      model: currentModel?.label,
      year: currentYear?.label,
      power: currentPower?.label,
      carNumber: carNumber ? beautifyCarNumber(carNumber) : null,
      documentType: CarDocumentsDictionary.find((doc) => doc.value === documentType)?.label,
      documentNumber: formatDocumentNumber(removeUnderscores(documentNumber)),
      documentIssueDate,
      vin: removeUnderscores(carVinNumber),
    };
  },
);
