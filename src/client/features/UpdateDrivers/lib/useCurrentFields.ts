import * as constants from '@sravni/cosago-react-library/lib/constants';
import { useFormContext } from '@sravni/cosago-react-library/lib/hooks';
import { useMemo } from 'react';

import type { DriversCommonFields } from 'entities/drivers';

import type { IDriverInfoMobileConfig } from '../ui/UpdateDrivers.config';

const PREVIOUS_LICENSE_FIELDS: Array<keyof DriversCommonFields> = ['prevLastName', 'prevLicenceNumber'];

export const useCurrentFields = <T extends DriversCommonFields>(fields: Array<IDriverInfoMobileConfig<T>>) => {
  const { watch } = useFormContext<DriversCommonFields>();
  const hasPreviousLicence = watch('hasPreviousLicence') === constants.FormFields.ConfirmChoice.yes;
  const currentMobileFields = useMemo(() => {
    if (hasPreviousLicence) {
      return fields;
    }

    return fields.filter(
      ({ fieldName }) =>
        !PREVIOUS_LICENSE_FIELDS.includes(fieldName as keyof DriversCommonFields) && fieldName !== 'kbm',
    );
  }, [fields, hasPreviousLicence]);
  return { currentMobileFields, hasPreviousLicence };
};
