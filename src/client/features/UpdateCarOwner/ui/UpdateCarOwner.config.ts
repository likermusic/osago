import { UI } from '@sravni/cosago-react-library/lib/components';
import type { IFieldConfiguration } from '@sravni/cosago-react-library/lib/types';
import type React from 'react';

import { CommonAddressField } from 'shared/ui/CommonAddressField';

import { hintWrapperHOC } from 'entities/hintNotification';
import type { OwnerCommonFields } from 'entities/owner';
import { PersonFioField } from 'entities/people';

import { PolicyHolder } from './fields';
import { FormFields, FormHints } from './UpdateCarOwner.texts';

interface ICarInfoMobileConfig extends Omit<IFieldConfiguration, 'fieldName'> {
  fieldName: keyof OwnerCommonFields;
}

export const FormFieldsControls: Record<keyof OwnerCommonFields, React.ReactNode> = {
  birthday: UI.FullDate,
  fullName: hintWrapperHOC({ hintText: FormHints.fullName.text })(PersonFioField),
  passportIssueDate: UI.FullDate,
  passportNumber: UI.PersonPassportSeriesNumber,
  registrationAddress: hintWrapperHOC({ hintText: FormHints.registrationAddress.text })(CommonAddressField),
  registrationAddressFlat: hintWrapperHOC({ hintText: FormHints.registrationAddressFlat.text })(UI.ApartmentNumber),
  policyHolder: hintWrapperHOC({ hintText: FormHints.policyHolder.text })(PolicyHolder),
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
  {
    fieldName: 'policyHolder',
    fieldTitle: FormFields.policyHolder,
    required: true,
  },
];
