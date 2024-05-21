import { Alert } from '@sravni/react-design-system';

import { useAppSelector } from 'shared/lib/redux';

import { selectVehicleType } from 'entities/carInfo';

import { InsurerAlertTexts } from './InsurerAlert.texts';

export const InsurerAlert: FC = () => {
  const vehicleType = useAppSelector(selectVehicleType);

  return (
    <Alert
      color="orange"
      title={InsurerAlertTexts.title(vehicleType)}
      subtitle={InsurerAlertTexts.subtitle}
    />
  );
};
