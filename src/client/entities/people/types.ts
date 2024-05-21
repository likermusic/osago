import type { FormFields } from '@sravni/cosago-react-library/lib/constants';
import type { ICustomSelectOption } from '@sravni/cosago-react-library/lib/types';

interface ICleanAddress {
  source?: {
    data: {
      fias_level: string;
      region: string;
    };
  };
  value?: string;
}

export type TPerson = {
  fullName: string;
  addressFlat?: string;
  address?: ICleanAddress;
  birthday?: string;
  experienceStartDate?: string;
  hasPreviousLicence?: boolean;
  licenceNumber?: string;
  passportNumber?: string;
  passportIssueDate?: string;
  fromEsia?: boolean;
  email?: string;
  phone?: string;
};

export type TPeopleState = {
  people: TPerson[];
};

export type TConvertPersonToFormFieldsResult = {
  phone?: string;
  email?: string;
  birthday: string;
  fullName: ICustomSelectOption;
  passportNumber: string;
  passportIssueDate: string;
  registrationAddress: Nullable<ICustomSelectOption>;
  registrationAddressFlat: string;
  licenceNumber: string;
  experienceStartDate: string;
  hasPreviousLicence: FormFields.ConfirmChoice;
};

export type TSendEventType = (newValue: string, previousValue: string, fieldName: string) => void;
