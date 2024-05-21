import { Typography } from '@sravni/react-design-system';
import React from 'react';

import { Steps } from '../Steps';

import { HowToTexts } from './LandingHowTo.texts';

const { Text, Heading } = Typography;

export const LandingHowTo: FC<{ vehicleTypeUi: VehicleType }> = ({ vehicleTypeUi }) => (
  <div>
    <Heading
      level={3}
      className="h-mb-8"
    >
      {HowToTexts.titleHowRegister}
      <span className="h-color-G100">{HowToTexts.titleTime}</span>
    </Heading>
    <Text
      size={16}
      className="h-mb-32 h-color-D60"
    >
      {HowToTexts.subtitle}
    </Text>
    <Steps vehicleTypeUi={vehicleTypeUi} />
  </div>
);
