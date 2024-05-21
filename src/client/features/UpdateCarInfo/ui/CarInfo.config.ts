import { UI } from '@sravni/cosago-react-library/lib/components';
import type { IFieldConfiguration, VehicleType } from '@sravni/cosago-react-library/lib/types';
import type React from 'react';

import type { CarInfoCommonFields } from 'entities/carInfo';
import { hintClickWrapperHOC, hintWrapperHOC } from 'entities/hintNotification';

import { FormFields, FormHints } from './CarInfo.texts';
import {
  CarBrand,
  CarEnginePower,
  CarIdentityNumber,
  CarNumber,
  CarDocumentNumber,
  CarDocumentType,
  CarModel,
  CarManufactureYear,
  CarModification,
  CarCategory,
} from './fields';

export interface ICarInfoMobileConfig extends Omit<IFieldConfiguration, 'fieldName'> {
  fieldName: keyof CarInfoCommonFields;
}

export const FormFieldsControls = (vehicleType: VehicleType): Record<keyof CarInfoCommonFields, React.ReactNode> => {
  const hintTexts = FormHints(vehicleType);

  return {
    bodyNumber: CarIdentityNumber,
    carBrand: CarBrand,
    carManufactureYear: hintClickWrapperHOC({ hintText: hintTexts.carManufactureYear.text })(CarManufactureYear),
    carModel: hintClickWrapperHOC({ hintText: hintTexts.carModel.text })(CarModel),
    carNumber: hintWrapperHOC({ hintText: hintTexts.carNumber.text })(CarNumber),
    carVinNumber: CarIdentityNumber,
    chassisNumber: CarIdentityNumber,
    documentIssueDate: hintWrapperHOC({ hintText: hintTexts.documentIssueDate.text })(UI.FullDate),
    documentNumber: CarDocumentNumber,
    documentType: hintWrapperHOC({ hintText: hintTexts.documentType.text })(CarDocumentType),
    enginePower: hintClickWrapperHOC({ hintText: hintTexts.enginePower.text })(CarEnginePower),
    identifyType: UI.CarIdentifyType,
    carModification: hintClickWrapperHOC({ hintText: hintTexts.carModification.text })(CarModification),
    category: CarCategory,
  };
};

export const FormFieldsMobileSequence = (vehicleType: VehicleType): ICarInfoMobileConfig[] => {
  const currentFormFields = FormFields(vehicleType);

  return [
    {
      fieldName: 'carNumber',
      fieldTitle: currentFormFields.carNumber,
      required: false,
    },
    {
      fieldName: 'carBrand',
      fieldTitle: currentFormFields.carBrand,
      required: true,
    },
    {
      fieldName: 'carModel',
      fieldTitle: currentFormFields.carModel,
      required: true,
    },
    {
      fieldName: 'carManufactureYear',
      fieldTitle: currentFormFields.carManufactureYear,
      required: true,
    },
    {
      fieldName: 'enginePower',
      fieldTitle: currentFormFields.enginePower,
      required: true,
    },
    {
      fieldName: 'carModification',
      fieldTitle: currentFormFields.carModification,
      required: true,
    },
    {
      fieldName: 'documentType',
      fieldTitle: currentFormFields.documentType,
      required: true,
    },
    {
      fieldName: 'documentNumber',
      fieldTitle: currentFormFields.documentNumber,
      required: true,
    },
    {
      fieldName: 'documentIssueDate',
      fieldTitle: currentFormFields.documentIssueDate,
      required: true,
    },
    {
      fieldName: 'identifyType',
      fieldTitle: currentFormFields.identifyType,
      required: true,
    },
    {
      fieldName: 'carVinNumber',
      fieldTitle: currentFormFields.carVinNumber,
      required: true,
    },
    {
      fieldName: 'bodyNumber',
      fieldTitle: currentFormFields.bodyNumber,
      required: true,
    },
    {
      fieldName: 'chassisNumber',
      fieldTitle: currentFormFields.chassisNumber,
      required: true,
    },
    {
      fieldName: 'category',
      fieldTitle: currentFormFields.category,
      required: true,
    },
  ];
};
