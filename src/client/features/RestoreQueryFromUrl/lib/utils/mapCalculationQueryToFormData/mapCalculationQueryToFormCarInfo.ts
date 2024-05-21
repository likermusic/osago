import type { Documents } from '@sravni/cosago-react-library/lib/constants';
import { concatWithPrefix, detectCarDocumentTypeUtil, formatDateString } from '@sravni/cosago-react-library/lib/utils';

import type { Query } from 'commonTypes/api/query';
import type { TFrontQuery } from 'commonTypes/TFrontQuery';

import type { CarInfoCommonFields } from 'entities/carInfo';

export const mapCalculationQueryToFormCarInfo = (
  query: Query.TRestoreCalculationQueryResponse | TFrontQuery,
): CarInfoCommonFields => {
  const {
    carDocument,
    carNumber,
    bodyNumber,
    chassisNumber,
    brandId,
    enginePower,
    vin,
    year,
    modification,
    modelId,
    vehicleCategory,
  } = query || {};

  const identifyType = detectCarDocumentTypeUtil(vin, bodyNumber, chassisNumber);
  const { series = '', documentType, date, number = '' } = carDocument || {};

  return {
    carNumber: carNumber || '',
    carVinNumber: vin || '',
    carModel: modelId ? { value: modelId } : null,
    carBrand: brandId ? { value: brandId } : null,
    carModification: modification ? { value: modification } : undefined,
    bodyNumber: bodyNumber || '',
    chassisNumber: chassisNumber || '',
    documentNumber: concatWithPrefix(series ?? '', number ?? '', ''),
    documentType: documentType ? (documentType as Documents.ECarDocumentType) : undefined,
    carManufactureYear: year ? { value: year } : null,
    documentIssueDate: date ? formatDateString(date) : '',
    enginePower: enginePower ? { value: enginePower } : null,
    identifyType,
    category: vehicleCategory
      ? { value: vehicleCategory?.toUpperCase(), label: vehicleCategory?.toUpperCase() }
      : undefined,
  };
};
