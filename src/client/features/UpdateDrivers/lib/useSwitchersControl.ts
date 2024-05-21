import { useFormContext } from '@sravni/cosago-react-library/lib/hooks';

import type { UpdateDriversWithSwitchersForm } from 'entities/drivers';

export const useSwitchersControl = () => {
  const { watch } = useFormContext<UpdateDriversWithSwitchersForm>();

  const isDriverOwner = watch('isDriverOwner');
  const isDriverInsurer = watch('isDriverInsurer');
  return {
    shouldShowAdditionalFields: isDriverOwner || isDriverInsurer,
  };
};
