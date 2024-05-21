import type { FormFields } from '@sravni/cosago-react-library/lib/constants';
import type { ICustomSelectValue } from '@sravni/cosago-react-library/lib/types';

import type { UserCommonFields } from 'shared/types';
import type { TKbmFieldWithAlert } from 'shared/types/TKbmFieldWithAlert';

export type DriversCommonFields = {
  fullName: Nullable<ICustomSelectValue>;
  birthday: string;
  licenceNumber: string;
  experienceStartDate: string;
  hasPreviousLicence: FormFields.ConfirmChoice;
  prevLicenceNumber?: string;
  prevLastName?: Nullable<string>;
  kbm?: TKbmFieldWithAlert;
};

export type DriversMultiDriveFields = {};

export type DriversEntityReducer = Form.Multi<DriversCommonFields> & {
  isMultiDrive: boolean;
  isFilledByEsiaStatus?: boolean;
};

export type UpdateDriversWithSwitchersForm = DriversCommonFields &
  Partial<
    Pick<UserCommonFields, 'passportNumber' | 'passportIssueDate' | 'registrationAddress' | 'registrationAddressFlat'>
  > & {
    isDriverOwner: boolean;
    isDriverInsurer: boolean;
  };
