import type { TVehicleCategoriesLowerCase } from 'commonTypes/categories';
import { formatDate } from 'commonUtils/formatters';

import { getDocumentSeriesNumberObj } from 'shared/lib/getDocumentSeriesNumberObj';

import type { CarInfoCommonFields } from 'entities/carInfo';

import { getCarIdentifierByPriority } from './getCarIdentifierByPriority';

export const mapCarInfoToQuery = (carInfo: CarInfoCommonFields) => ({
  ...getCarIdentifierByPriority(carInfo),
  brandId: carInfo.carBrand?.value ? Number(carInfo.carBrand.value) : undefined,
  carDocument: {
    date: carInfo.documentIssueDate ? formatDate.toServerFromClient(carInfo.documentIssueDate) : undefined,
    documentType: carInfo.documentType,
    ...getDocumentSeriesNumberObj(carInfo.documentNumber, carInfo.documentType),
  },
  carNumber: carInfo.carNumber,
  enginePower: carInfo.enginePower?.value ? Number(carInfo.enginePower.value) : undefined,
  modelId: carInfo.carModel?.value ? Number(carInfo.carModel.value) : undefined,
  modification:
    typeof carInfo.carModification?.value === 'number'
      ? String(carInfo.carModification?.value)
      : carInfo.carModification?.value,
  // Бэк принимает в любом формате категорию, но поменять тип не может. Сейчас мы отправляем в апперкейсе
  vehicleCategory: carInfo.category?.value as TVehicleCategoriesLowerCase,
  year: carInfo.carManufactureYear?.value ? Number(carInfo.carManufactureYear.value) : undefined,
});
