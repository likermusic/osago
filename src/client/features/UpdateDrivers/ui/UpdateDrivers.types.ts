import type { ICustomSelectValue } from '@sravni/cosago-react-library/lib/types';

import type { TCommonAdditionalFormProps } from 'shared/types';

import type { DriversCommonFields } from 'entities/drivers';

export type TDriversAdditionalFields = {
  driverId: Nullable<string>;
  onDeleteDriver?: () => void;
  onAddDriver?: () => void;
  isPossibleToAddDriver?: boolean;
  isFirstDriver?: boolean;
  isMultidrive: boolean;
  isFilledByEsia?: boolean;
  onChangeMultiDrive: (isMultiDrive: boolean) => void;
  isPossibleToDeleteDriver?: boolean;
  driverIndex: number;
} & TCommonAdditionalFormProps;

export type UpdateDriversWithSwitchersForm = DriversCommonFields & {
  isDriverOwner: boolean;
  isDriverInsurer: boolean;
  passportNumber?: string;
  passportIssueDate?: string;
  registrationAddress?: Nullable<ICustomSelectValue>;
  registrationAddressFlat?: string;
};
