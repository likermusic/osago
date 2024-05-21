import { UI } from '@sravni/cosago-react-library/lib/components';
import type { IFieldConfiguration } from '@sravni/cosago-react-library/lib/types';
import type React from 'react';

import type { TVehicleCategories } from 'commonTypes/categories';

import { CommonAddressField } from 'shared/ui/CommonAddressField';

import type { DriversCommonFields, UpdateDriversWithSwitchersForm, DriversMultiDriveFields } from 'entities/drivers';
import { hintWrapperHOC } from 'entities/hintNotification';

import { DriverLicenseSeriesNumber, DriverPersonFio, PrevLastName } from './fields';
import { KbmField } from './fields/KbmField';
import { FormFieldsLabels, FormFieldsWithSwitcher, FormHints, IsDriverInsurerTooltipText } from './UpdateDrivers.texts';

export interface IDriverInfoMobileConfig<T extends DriversCommonFields = DriversCommonFields>
  extends Omit<IFieldConfiguration, 'fieldName'> {
  fieldName: keyof T;
}
export const FormFieldsMultiDriveControls: Record<keyof DriversMultiDriveFields, React.ReactNode> = {};

export const FormFieldsControls: Record<keyof DriversCommonFields, React.ReactNode> = {
  birthday: UI.FullDate,
  experienceStartDate: hintWrapperHOC({ hintText: FormHints.experienceStartDate.text })(UI.FullDate),
  fullName: hintWrapperHOC({ hintText: FormHints.fullName.text })(DriverPersonFio),
  hasPreviousLicence: hintWrapperHOC({ hintText: FormHints.hasPreviousLicence.text })(UI.CommonConfirm),
  licenceNumber: hintWrapperHOC({ hintText: FormHints.licenceNumber.text })(DriverLicenseSeriesNumber),
  prevLastName: hintWrapperHOC({ hintText: FormHints.prevLastName.text })(PrevLastName),
  prevLicenceNumber: hintWrapperHOC({ hintText: FormHints.prevLicenceNumber.text })(DriverLicenseSeriesNumber),
  kbm: KbmField,
};

export const FormWithSwitchersFieldsControls: Record<keyof UpdateDriversWithSwitchersForm, React.ReactNode> = {
  ...FormFieldsControls,
  isDriverOwner: UI.ControlledFormSwitcher,
  isDriverInsurer: hintWrapperHOC({ hintText: IsDriverInsurerTooltipText, shouldShowDesktopHint: false })(
    UI.ControlledFormSwitcher,
  ),
  passportIssueDate: UI.FullDate,
  passportNumber: UI.PersonPassportSeriesNumber,
  registrationAddress: CommonAddressField,
  registrationAddressFlat: UI.ApartmentNumber,
};

export const FormFieldsMobileSequence = (
  vehicleCategory: TVehicleCategories | undefined,
): IDriverInfoMobileConfig[] => {
  const currentFormFields = FormFieldsLabels(vehicleCategory);

  return [
    {
      fieldName: 'fullName',
      fieldTitle: currentFormFields.fullName,
      required: true,
      disableNextSubmit: false,
    },
    {
      fieldName: 'birthday',
      fieldTitle: currentFormFields.birthday,
      required: true,
    },
    {
      fieldName: 'licenceNumber',
      fieldTitle: currentFormFields.licenceNumber,
      required: true,
    },
    {
      fieldName: 'experienceStartDate',
      fieldTitle: currentFormFields.experienceStartDate,
      required: true,
    },
    {
      fieldName: 'hasPreviousLicence',
      fieldTitle: currentFormFields.hasPreviousLicence,
      required: false,
    },
    {
      fieldName: 'prevLastName',
      fieldTitle: currentFormFields.prevLastName,
      required: false,
    },
    {
      fieldName: 'prevLicenceNumber',
      fieldTitle: currentFormFields.prevLicenceNumber,
      required: false,
    },
  ];
};

export const FormWithSwitchersFieldsMobileSequenceShort = (
  vehicleCategory: TVehicleCategories | undefined,
): Array<IDriverInfoMobileConfig<UpdateDriversWithSwitchersForm>> => {
  const currentFormFieldsWithSwitcher = FormFieldsWithSwitcher(vehicleCategory);

  return [
    ...FormFieldsMobileSequence(vehicleCategory),
    {
      fieldName: 'isDriverOwner',
      fieldTitle: currentFormFieldsWithSwitcher.isDriverOwner,
      required: true,
      shouldShowAlways: true,
    },
    {
      fieldName: 'isDriverInsurer',
      fieldTitle: currentFormFieldsWithSwitcher.isDriverInsurer,
      required: true,
      shouldShowAlways: true,
    },
  ];
};

export const FormWithSwitchersFieldsMobileSequence = (
  vehicleCategory: TVehicleCategories | undefined,
): Array<IDriverInfoMobileConfig<UpdateDriversWithSwitchersForm>> => {
  const currentFormFieldsWithSwitcher = FormFieldsWithSwitcher(vehicleCategory);

  return [
    ...FormWithSwitchersFieldsMobileSequenceShort(vehicleCategory),
    {
      fieldName: 'passportNumber',
      fieldTitle: currentFormFieldsWithSwitcher.passportNumber,
      required: false,
    },
    {
      fieldName: 'passportIssueDate',
      fieldTitle: currentFormFieldsWithSwitcher.passportIssueDate,
      required: false,
    },
    {
      fieldName: 'registrationAddress',
      fieldTitle: currentFormFieldsWithSwitcher.registrationAddress,
      required: false,
    },
    {
      fieldName: 'registrationAddressFlat',
      fieldTitle: currentFormFieldsWithSwitcher.registrationAddressFlat,
      required: false,
    },
  ];
};
