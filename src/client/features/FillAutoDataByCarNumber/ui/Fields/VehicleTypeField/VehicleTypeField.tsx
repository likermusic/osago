import { useFormContext } from '@sravni/cosago-react-library/lib/hooks';
import type { IFieldFactoryProps, VehicleType } from '@sravni/cosago-react-library/lib/types';
import { Typography } from '@sravni/react-design-system';
import React from 'react';

import { VEHICLE_TEXT_MAP_GENITIVE_CASE } from 'shared/config/vehicleTypeText';
import { sendEventLandingVehicleSwitcher } from 'shared/lib/sendGAEvents';

import styles from './VehicleTypeField.module.scss';
import { VehicleTypeFieldTexts } from './VehicleTypeField.texts';

const valueMapper: Record<VehicleType, VehicleType> = {
  car: 'motorcycle',
  motorcycle: 'car',
};

export const VehicleTypeField: FC<IFieldFactoryProps> = ({ type }) => {
  const { setValue, watch, resetField } = useFormContext();
  // уйти от жесткого каста типа https://sravni-corp.atlassian.net/browse/OS-10351
  const value = watch(type) as VehicleType;

  const TextDependOnVehicleType: Record<VehicleType, JSX.Element> = {
    motorcycle: (
      <>
        <span className={styles.activeText}>{VEHICLE_TEXT_MAP_GENITIVE_CASE.car}</span>{' '}
        {VehicleTypeFieldTexts.middleText} {VEHICLE_TEXT_MAP_GENITIVE_CASE.motorcycle}
      </>
    ),
    car: (
      <>
        {VEHICLE_TEXT_MAP_GENITIVE_CASE.car} {VehicleTypeFieldTexts.middleText}{' '}
        <span className={styles.activeText}>{VEHICLE_TEXT_MAP_GENITIVE_CASE.motorcycle}</span>
      </>
    ),
  };

  return (
    <Typography.Text
      strong
      size={16}
      className={styles.secondText}
      onClick={() => {
        const newValue = valueMapper[value];
        setValue(type, newValue);
        resetField('carNumber');

        sendEventLandingVehicleSwitcher(newValue);
      }}
    >
      {VehicleTypeFieldTexts.commonText} {TextDependOnVehicleType[value]}
    </Typography.Text>
  );
};
