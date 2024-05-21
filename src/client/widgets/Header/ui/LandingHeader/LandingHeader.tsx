import type { VehicleType } from '@sravni/cosago-react-library/lib/types';
import { Space, Typography } from '@sravni/react-design-system';
import { useIsMobile } from '@sravni/react-utils';
import React from 'react';

import { useAppSelector } from 'shared/lib/redux';
import { OptimizedPicture } from 'shared/ui/OptimizedPicture';

import { Invitation } from 'entities/invitation';
import { metadataSelector } from 'entities/metadata';

import happyMenBesideCar from '../assets/happyMenBesideCar.png';
import happyMenBesideMotorcycle from '../assets/happyMenBesideMotorcycle.png';

import styles from './LandingHeader.module.scss';
import { LandingPageTexts } from './LandingHeader.texts';

const { Text, Heading } = Typography;

const IMG: Record<VehicleType, { img: string; width: number | undefined; height: number | undefined }> = {
  car: {
    img: happyMenBesideCar,
    width: 281,
    height: undefined,
  },
  motorcycle: {
    img: happyMenBesideMotorcycle,
    width: 300,
    height: 300,
  },
};

export const LandingHeader: FC<{ vehicleTypeUi: VehicleType }> = ({ vehicleTypeUi }) => {
  const isMobile = useIsMobile();
  const meta = useAppSelector(metadataSelector);
  const headerTitle = meta.heading || LandingPageTexts.caption;

  const isMotorcyclePage = vehicleTypeUi === 'motorcycle';

  return isMobile ? (
    <Space
      direction="horizontal"
      className={styles.mobileContainer}
    >
      <div>
        <Invitation />
        <Heading
          level={1}
          className="h-text-left"
        >
          {headerTitle}
        </Heading>
        <Text
          size={14}
          className="h-color-D60 h-text-left"
        >
          {LandingPageTexts.subtitle(vehicleTypeUi)}
        </Text>
      </div>

      <OptimizedPicture
        {...IMG[vehicleTypeUi]}
        className={styles.mobileImg}
        alt={LandingPageTexts.carImgAlt}
      />
    </Space>
  ) : (
    <Space
      direction="horizontal"
      className={isMotorcyclePage ? undefined : 'h-p-16'}
      align="center"
    >
      <Space
        direction="vertical"
        className="h-mt-40"
      >
        <Invitation />
        <Heading
          level={1}
          className="h-mb-16"
        >
          {headerTitle}
        </Heading>

        <Text
          size={16}
          className="h-color-D60"
        >
          {LandingPageTexts.subtitle(vehicleTypeUi)}
        </Text>
      </Space>

      <OptimizedPicture
        {...IMG[vehicleTypeUi]}
        alt={LandingPageTexts.carImgAlt}
      />
    </Space>
  );
};
