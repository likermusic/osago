import { UI } from '@sravni/cosago-react-library/lib/components';
import { useFormContext } from '@sravni/cosago-react-library/lib/hooks';
import type { IFieldFactoryProps } from '@sravni/cosago-react-library/lib/types';
import React from 'react';

import { useAppSelector } from 'shared/lib/redux';

import type { CarInfoCommonFields } from 'entities/carInfo';
import { selectVehicleType } from 'entities/carInfo';
import { HintWrapper } from 'entities/hintNotification';

import { shouldUseMaskedCarInfoValue } from '../../model/CarInfo.selectors';
import { FormFields, FormHints } from '../CarInfo.texts';

type TIdentityNumber = keyof Pick<CarInfoCommonFields, 'carVinNumber' | 'bodyNumber' | 'chassisNumber'>;

export const CarIdentityNumber: FC<IFieldFactoryProps> = ({ isMobileFlow, type, ...props }) => {
  const { getValues, watch } = useFormContext<CarInfoCommonFields>();
  const { identifyType } = getValues();
  const currentIdentityValue = watch(identifyType as TIdentityNumber);
  const isMasked = useAppSelector(shouldUseMaskedCarInfoValue(type as TIdentityNumber, currentIdentityValue));
  const vehicleType = useAppSelector(selectVehicleType);

  const hint = (identifyType && FormHints(vehicleType)?.identifyType?.[identifyType]?.text) || '';

  return (
    <HintWrapper
      isMobileFlow={!!isMobileFlow}
      hintText={hint}
    >
      <UI.CarIdentityNumber
        {...props}
        type={type}
        isMasked={isMasked}
        identifyTypeFieldName="identifyType"
        label={(identifyType && FormFields(vehicleType)[identifyType]) || FormFields(vehicleType).carVinNumber}
      />
    </HintWrapper>
  );
};
