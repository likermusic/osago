import React from 'react';

import { useAppSelector } from 'shared/lib/redux';
import { AnketaAlert } from 'shared/ui/AnketaAlert';

import { selectIsCarInfoLoaded, selectVehicleType } from '../../model/carInfo.selectors';

import { CarInfoLoadedAlertTexts } from './CarInfoLoadedAlert.texts';

export const CarInfoLoadedAlert: FC = () => {
  const isCarInfoLoaded = useAppSelector(selectIsCarInfoLoaded);
  const vehicleType = useAppSelector(selectVehicleType);

  return isCarInfoLoaded ? (
    <AnketaAlert
      title={CarInfoLoadedAlertTexts.title}
      subtitle={CarInfoLoadedAlertTexts.subtitle(vehicleType)}
    />
  ) : null;
};
