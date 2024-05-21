import { FormFields } from '@sravni/cosago-react-library/lib/constants';

import type { DriversCommonFields } from './types';

export const MAX_DRIVERS_COUNT = 5;

export const MAX_DRIVERS_LICENSE_LENGTH = 10;

export const DRIVERS_DEFAULT_STATE: DriversCommonFields = {
  fullName: null,
  prevLastName: null,
  licenceNumber: '',
  prevLicenceNumber: '',
  birthday: '',
  experienceStartDate: '',
  hasPreviousLicence: FormFields.ConfirmChoice.no,
};
