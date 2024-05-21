import { UI } from '@sravni/cosago-react-library/lib/components';
import type { IFieldFactoryProps } from '@sravni/cosago-react-library/lib/types';
import React from 'react';

import { useAppSelector } from 'shared/lib/redux';

import { selectVehicleType } from 'entities/carInfo';

type TCarNumber = Pick<IFieldFactoryProps, 'onBlur' | 'required' | 'type' | 'onEnterPressed'>;

export const CarNumber: FC<TCarNumber> = (props) => {
  const vehicleType = useAppSelector(selectVehicleType);

  return (
    <UI.VehicleNumberWidget
      {...props}
      backgroundColor="gray"
      vehicleType={vehicleType}
    />
  );
};
