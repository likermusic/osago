import { useAppSelector } from 'shared/lib/redux';
import { AnketaAlert } from 'shared/ui/AnketaAlert';

import { selectVehicleType } from 'entities/carInfo';

import { MultidriveAlertTexts } from './MultidriveAlert.texts';

export const MultidriveAlert: FC = () => {
  const vehicleType = useAppSelector(selectVehicleType);
  return (
    <AnketaAlert
      title={MultidriveAlertTexts.title}
      subtitle={MultidriveAlertTexts.subtitle(vehicleType)}
    />
  );
};
