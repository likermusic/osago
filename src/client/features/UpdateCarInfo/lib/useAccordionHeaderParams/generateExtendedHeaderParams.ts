import { concatWithPrefix, anonymizeValue } from '@sravni/cosago-react-library/lib/utils';

import { TEXT_DOT_SEPARATOR } from 'shared/config/contacts';
import { replaceSpacesToUnbreakableGap } from 'shared/lib/formatters';

import type { selectCarParamsLabels } from 'entities/carInfo';

import { FormTexts } from '../../ui/CarInfo.texts';

export const generateExtendedHeaderParams = (
  carParamLabels: Partial<ReturnType<typeof selectCarParamsLabels>>,
  isVinMasked: boolean,
  isDocumentMasked: boolean,
) => {
  const { carNumber, power, documentNumber, documentType, documentIssueDate, vin, logo, brand, year, model } =
    carParamLabels || {};

  let currDescription = carNumber ?? FormTexts.emptyCarNumber;
  let currTitle = concatWithPrefix(concatWithPrefix(brand, model, ' '), year, ' ');

  if (power) {
    currTitle = concatWithPrefix(currTitle, replaceSpacesToUnbreakableGap(power), ', ');
  }

  if (vin) {
    const currentVin = isVinMasked ? anonymizeValue(vin, 2, 4) : vin;
    currDescription = concatWithPrefix(currDescription, `${FormTexts.vin} ${currentVin}`, TEXT_DOT_SEPARATOR);
  }

  if (documentNumber) {
    const currentDocumentNumber = isDocumentMasked ? anonymizeValue(documentNumber, 2, 4) : documentNumber;
    currDescription = concatWithPrefix(
      currDescription,
      `${documentType}: ${replaceSpacesToUnbreakableGap(currentDocumentNumber)} от ${documentIssueDate}`,
      TEXT_DOT_SEPARATOR,
    );
  }

  return {
    icon: logo,
    title: currTitle,
    description: currDescription,
  };
};
