import { UI } from '@sravni/cosago-react-library/lib/components';
import { Documents } from '@sravni/cosago-react-library/lib/constants';
import { useFormContext } from '@sravni/cosago-react-library/lib/hooks';
import type { IFieldFactoryProps } from '@sravni/cosago-react-library/lib/types';
import React from 'react';

import { useAppSelector } from 'shared/lib/redux';

import type { CarInfoCommonFields } from 'entities/carInfo';
import { selectVehicleType } from 'entities/carInfo';
import { HintWrapper } from 'entities/hintNotification';

import { shouldUseMaskedCarInfoValue } from '../../model/CarInfo.selectors';
import { FormFields, FormHints } from '../CarInfo.texts';

export const CarDocumentNumber: FC<IFieldFactoryProps> = ({ isMobileFlow, ...props }) => {
  const { getValues } = useFormContext<CarInfoCommonFields>();
  const { documentType: carDocumentTypeValue, documentNumber } = getValues();
  const isEPTS = carDocumentTypeValue === Documents.ECarDocumentType.EPTS;
  const vehicleType = useAppSelector(selectVehicleType);
  const hint = (carDocumentTypeValue && FormHints(vehicleType).documentNumber?.[carDocumentTypeValue]?.text) || '';
  const isMasked = useAppSelector(shouldUseMaskedCarInfoValue('documentNumber', documentNumber));

  return (
    <HintWrapper
      isMobileFlow={!!isMobileFlow}
      hintText={hint}
    >
      <UI.CarDocumentNumber
        {...props}
        isMasked={isMasked}
        isMobileFlow={isMobileFlow}
        carDocumentTypeFieldName="documentType"
        label={isEPTS ? FormFields(vehicleType).documentNumberEPTS : FormFields(vehicleType).documentNumber}
      />
    </HintWrapper>
  );
};
