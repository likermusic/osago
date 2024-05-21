import * as constants from '@sravni/cosago-react-library/lib/constants';
import { useFormContext } from '@sravni/cosago-react-library/lib/hooks';
import type { IFieldFactoryProps } from '@sravni/cosago-react-library/lib/types';
import { useEffect } from 'react';

import { sendEventShowKbmField } from 'shared/lib/sendGAEvents';

import type { DriversCommonFields } from 'entities/drivers';
import { KbmFieldWithAlert } from 'entities/KbmDiscount';

export const KbmField: FC<IFieldFactoryProps> = () => {
  const { watch, setValue } = useFormContext<DriversCommonFields>();
  const { value, status } = watch('kbm') || {};

  const setPreviousLicenseYes = () => {
    setValue('hasPreviousLicence', constants.FormFields.ConfirmChoice.yes);
  };

  useEffect(() => sendEventShowKbmField(), []);

  return (
    <KbmFieldWithAlert
      value={value}
      status={status}
      setPreviousLicenseYes={setPreviousLicenseYes}
    />
  );
};
