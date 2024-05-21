import type { VehicleType } from '@sravni/cosago-react-library/lib/types';
import { anonymizeValue, concatWithPrefix } from '@sravni/cosago-react-library/lib/utils';

import { TEXT_DOT_SEPARATOR } from 'shared/config/contacts';
import { replaceSpacesToUnbreakableGap } from 'shared/lib/formatters';

import type { selectCarParamsLabels } from 'entities/carInfo';

import { FormTexts } from '../../ui/CarInfo.texts';

export const generateCommonHeaderParams = (
  carParamLabels: Partial<ReturnType<typeof selectCarParamsLabels>>,
  isVinMasked: boolean,
  isDocumentMasked: boolean,
  vehicleType: VehicleType,
) => {
  const { carNumber, power, documentNumber, documentType, documentIssueDate, vin, logo, brand, year, model } =
    carParamLabels || {};

  let currDescription = carNumber ?? FormTexts.emptyCarNumber;

  if (power) {
    currDescription = concatWithPrefix(currDescription, replaceSpacesToUnbreakableGap(power), TEXT_DOT_SEPARATOR);
  }

  if (documentNumber) {
    const currentDocumentNumber = isDocumentMasked ? anonymizeValue(documentNumber, 2, 4) : documentNumber;
    currDescription = concatWithPrefix(
      currDescription,
      `${documentType} ${replaceSpacesToUnbreakableGap(currentDocumentNumber)} от ${documentIssueDate}`,
      TEXT_DOT_SEPARATOR,
    );
  }

  if (vin) {
    const currentVin = isVinMasked ? anonymizeValue(vin, 2, 4) : vin;
    currDescription = concatWithPrefix(currDescription, `${FormTexts.vin} ${currentVin}`, TEXT_DOT_SEPARATOR);
  }

  return {
    icon: logo,
    title: !brand
      ? FormTexts.emptyBrand(vehicleType)
      : concatWithPrefix(concatWithPrefix(brand, model, ' '), year, ', '),
    description: currDescription === FormTexts.emptyCarNumber ? '' : currDescription,
  };
};
