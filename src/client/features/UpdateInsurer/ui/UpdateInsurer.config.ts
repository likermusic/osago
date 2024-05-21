import { UI } from '@sravni/cosago-react-library/lib/components';
import type { IFieldConfiguration } from '@sravni/cosago-react-library/lib/types';
import type React from 'react';

import type { UserCommonFields } from 'shared/types';
import { CommonAddressField } from 'shared/ui/CommonAddressField';

import { hintWrapperHOC } from 'entities/hintNotification';
import { PersonFioField } from 'entities/people';

import { FormFields, FormHints } from './UpdateInsurer.texts';

interface ICarInfoMobileConfig extends Omit<IFieldConfiguration, 'fieldName'> {
  fieldName: keyof UserCommonFields;
}

export const FormFieldsControls: Record<keyof UserCommonFields, React.ReactNode> = {
  birthday: UI.FullDate,
  fullName: hintWrapperHOC({ hintText: FormHints.fullName.text })(PersonFioField),
  passportIssueDate: UI.FullDate,
  passportNumber: UI.PersonPassportSeriesNumber,
  registrationAddress: hintWrapperHOC({ hintText: FormHints.registrationAddress.text })(CommonAddressField),
  registrationAddressFlat: hintWrapperHOC({ hintText: FormHints.registrationAddressFlat.text })(UI.ApartmentNumber),
};

export const FormFieldsMobileSequence: ICarInfoMobileConfig[] = [
  {
    fieldName: 'fullName',
    fieldTitle: FormFields.fullName,
    required: true,
    disableNextSubmit: false,
  },
  {
    fieldName: 'birthday',
    fieldTitle: FormFields.birthday,
    required: true,
  },
  {
    fieldName: 'passportNumber',
    fieldTitle: FormFields.passportNumber,
    required: true,
  },
  {
    fieldName: 'passportIssueDate',
    fieldTitle: FormFields.passportIssueDate,
    required: true,
  },
  {
    fieldName: 'registrationAddress',
    fieldTitle: FormFields.registrationAddress,
    required: true,
  },
  {
    fieldName: 'registrationAddressFlat',
    fieldTitle: FormFields.registrationAddressFlat,
    required: false,
  },
];
