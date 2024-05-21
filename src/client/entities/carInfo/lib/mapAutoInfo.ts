import { Documents } from '@sravni/cosago-react-library/lib/constants';
import { detectCarDocumentTypeUtil, formatDateString } from '@sravni/cosago-react-library/lib/utils';

import type { Auto } from 'commonTypes/api/auto';

import { isBrandValid, mapBrand } from './mapBrands';
import { isPropertyValid, mapProperty } from './mapCarPropertyToSelectOption';
import { mapYear } from './mapManufactureYears';
import { mapPower } from './mapPowers';

// eslint-disable-next-line complexity
export const mapCarInfo = (info: Auto.GetAutoInfo) => {
  try {
    const { brand, model, vin, year, carDocument, power, chassisNumber, bodyNumber, category } = info;

    const carBrand = isBrandValid(brand)
      ? {
          ...mapBrand(brand),
          data: {
            ...mapBrand(brand).data,
            isPrefilled: true,
          },
        }
      : { value: '' };

    const carModel =
      brand?.id && isPropertyValid(model)
        ? { ...mapProperty(model), data: { isPrefilled: true } }
        : { value: '', categories: [] };

    const carManufactureYear =
      brand?.id && model?.id && year ? { ...mapYear(year), data: { isPrefilled: true } } : { value: '' };

    const enginePower =
      brand?.id && model?.id && year && power ? { ...mapPower(power), data: { isPrefilled: true } } : { value: '' };

    const identifyType = detectCarDocumentTypeUtil(vin ?? '', bodyNumber ?? '', chassisNumber ?? '');
    let docType = Documents.ECarDocumentType.STS;
    if (carDocument?.documentType === 'ePts') {
      docType = Documents.ECarDocumentType.EPTS;
    } else if (carDocument?.documentType === 'pts') {
      docType = Documents.ECarDocumentType.PTS;
    }

    const firstCategory = carModel?.categories?.[0];
    const categoryFromCarModel =
      carModel?.categories?.length === 1 ? { value: firstCategory, label: firstCategory } : undefined;

    // проверяем категорию, если она пришла с бэка, то используем ее как выбранную
    // если не пришла, то если в у этой модели доступна только категория B(логика выше), то используем категорию B как выбранную
    // иначе выводим пользователю поле с выбором категории(то есть используемая категория undefined)
    const currentCategory = category
      ? { value: category, label: category, data: { isPrefilled: true } }
      : categoryFromCarModel;

    return {
      identifyType,
      carBrand,
      carModel,
      carManufactureYear,
      documentType: docType,
      documentNumber: `${carDocument?.series?.trim() || ''}${carDocument?.number?.trim() || ''}`,
      carVinNumber: vin ?? '',
      documentIssueDate: formatDateString(carDocument?.date ?? ''),
      enginePower,
      chassisNumber: chassisNumber ?? '',
      bodyNumber: bodyNumber ?? '',
      category: currentCategory,
    };
  } catch (e) {
    return null;
  }
};
