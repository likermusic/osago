import { Carousel } from '@sravni/react-design-system';

import { Step } from '../Step/Step';

import { StepsList } from './Steps.contants';
import styles from './Steps.module.scss';

export const Steps: FC<{ vehicleTypeUi: VehicleType }> = ({ vehicleTypeUi }) => (
  <Carousel className={styles.carousel}>
    {StepsList.map((stepConfig) => (
      <Step
        key={stepConfig.stepIndex}
        vehicleTypeUi={vehicleTypeUi}
        {...stepConfig}
      />
    ))}
  </Carousel>
);
